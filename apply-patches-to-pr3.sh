#!/bin/bash
# Apply patches to PR #3 branch to resolve merge conflicts

set -e

echo "========================================="
echo "PR #3 Patch Application Script"
echo "========================================="
echo ""

# Ensure we're in the repository root
cd "$(git rev-parse --show-toplevel)"

# Check if patches directory exists
if [ ! -d "patches" ]; then
    echo "❌ Error: patches directory not found"
    echo "   This script must be run from a branch that contains the patches/ directory"
    exit 1
fi

# Check current branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "copilot/remove-secrets-add-env-example-another-one" ]; then
    echo "⚠️  Current branch: $current_branch"
    echo "📝 Switching to PR #3 branch..."
    
    # Fetch latest changes
    git fetch origin
    
    # Checkout the PR #3 branch
    git checkout copilot/remove-secrets-add-env-example-another-one
fi

echo "✅ On branch: copilot/remove-secrets-add-env-example-another-one"
echo ""

# Check if patches are already applied
if git log --oneline | grep -q "Fix: ensure EnhancedNewsHub.tsx has no merge conflicts"; then
    echo "✅ Patches appear to be already applied"
    echo "ℹ️  Checking merge status..."
    
    if git merge-base --is-ancestor main HEAD; then
        echo "✅ Main branch is merged"
        echo ""
        echo "🚀 Ready to push!"
        echo "   Run: git push origin copilot/remove-secrets-add-env-example-another-one"
        exit 0
    fi
fi

# Find patches
patch_files=$(ls patches/*.patch 2>/dev/null | sort)
if [ -z "$patch_files" ]; then
    echo "❌ Error: No patch files found in patches/ directory"
    exit 1
fi

echo "📝 Found patches to apply:"
for patch in $patch_files; do
    echo "   - $(basename $patch)"
done
echo ""

# Apply each patch
for patch in $patch_files; do
    echo "📝 Applying: $(basename $patch)"
    
    if git am "$patch"; then
        echo "   ✅ Applied successfully"
    else
        echo "   ❌ Failed to apply patch"
        echo ""
        echo "   Manual resolution required. Run:"
        echo "   git am --abort  # to cancel"
        echo "   # or fix conflicts and run:"
        echo "   git add <resolved-files>"
        echo "   git am --continue"
        exit 1
    fi
done

echo ""
echo "========================================="
echo "✅ All patches applied successfully!"
echo "========================================="
echo ""

# Verify build
echo "📝 Verifying build..."
echo ""

if npm run build; then
    echo ""
    echo "========================================="
    echo "✅ Build verification passed!"
    echo "========================================="
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Review changes: git log --oneline -5"
    echo "   2. Push to GitHub: git push origin copilot/remove-secrets-add-env-example-another-one"
    echo ""
else
    echo ""
    echo "❌ Build failed! Please review and fix the build errors."
    echo ""
    exit 1
fi
