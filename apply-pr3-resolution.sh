#!/bin/bash
# Apply merge conflict resolution to PR #3 branch

set -e

echo "========================================="
echo "PR #3 Merge Conflict Resolution Script"
echo "========================================="
echo ""

# Ensure we're in the repository root
cd "$(git rev-parse --show-toplevel)"

# Check if we need to perform the merge
current_branch=$(git branch --show-current)
if [ "$current_branch" != "copilot/remove-secrets-add-env-example-another-one" ]; then
    echo "⚠️  Current branch: $current_branch"
    echo "📝 Checking out PR #3 branch..."
    
    # Fetch latest changes
    git fetch origin
    
    # Checkout the PR #3 branch
    git checkout copilot/remove-secrets-add-env-example-another-one
fi

echo "✅ On branch: copilot/remove-secrets-add-env-example-another-one"
echo ""

# Check if main merge is needed
if git merge-base --is-ancestor main HEAD; then
    echo "✅ Main branch is already merged into this branch"
    echo "ℹ️  No merge conflicts to resolve"
    exit 0
fi

echo "📝 Merging main branch with --allow-unrelated-histories..."
echo ""

# Attempt to merge main
if git merge main --allow-unrelated-histories --no-edit; then
    echo "✅ Merge completed without conflicts!"
else
    echo "⚠️  Merge conflicts detected. Resolving automatically..."
    echo ""
    
    # Copy resolved files from the conflict resolution branch
    resolved_files=(
        "src/App.tsx"
        "src/components/ColombianLayout.tsx"
        "src/components/EnhancedNewsHub.tsx"
        "src/components/EnhancedReelsHub.tsx"
        "src/pages/CommunityHub.tsx"
        "README.md"
        ".github/workflows/pr-build.yml"
    )
    
    for file in "${resolved_files[@]}"; do
        if [ -f "$file" ]; then
            echo "  Resolving: $file"
            git show copilot/resolve-merge-conflicts-pr3:"$file" > "$file" 2>/dev/null || {
                # If file doesn't exist in resolution branch, keep HEAD version
                echo "    (keeping HEAD version)"
                git checkout --ours "$file"
            }
            git add "$file"
        fi
    done
    
    echo ""
    echo "📝 Committing merge resolution..."
    git commit -m "Merge main into PR #3 branch (copilot/remove-secrets-add-env-example-another-one)

Resolved merge conflicts by:
- Kept PR #3's type flexibility (string parameter in handleNavigate and onNavigate)
- Preserved all PR #3 features: commenting system, user profiles, notifications, political reels, news with perspectives, deployment configs
- Added permissions from main to GitHub Actions workflow
- Maintained all enhanced components from PR #3"
fi

echo ""
echo "========================================="
echo "✅ Merge conflicts resolved successfully!"
echo "========================================="
echo ""
echo "📝 Verifying build..."
echo ""

# Verify build
if npm run build; then
    echo ""
    echo "========================================="
    echo "✅ Build verification passed!"
    echo "========================================="
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Review the changes: git log --oneline -5"
    echo "   2. Push to GitHub: git push origin copilot/remove-secrets-add-env-example-another-one"
    echo ""
else
    echo ""
    echo "❌ Build failed! Please review and fix the build errors."
    echo ""
    exit 1
fi
