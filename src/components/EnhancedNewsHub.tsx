import React, { useState } from 'react';

type NewsRegion = 'world' | 'south-america';
type PoliticalPerspective = 'neutral' | 'right' | 'left';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  fullContent: string;
  region: NewsRegion;
  timestamp: string;
  perspectives?: {
    neutral: string;
    right: string;
    left: string;
  };
}

// Mock news data - in production, this would come from an API
const mockNews: NewsArticle[] = [
  // World News
  { 
    id: 1, 
    title: 'Global Climate Summit Concludes with New Agreements', 
    description: 'World leaders reach historic agreement on climate action with commitments from over 150 countries.',
    fullContent: 'In a landmark moment for global cooperation, world leaders from over 150 countries have reached a historic agreement on climate action. The summit, which lasted five days, resulted in comprehensive commitments to reduce carbon emissions by 45% by 2030. Major economies have pledged significant investments in renewable energy infrastructure, with developed nations committing to provide financial support to developing countries for their green transition. The agreement includes mechanisms for monitoring and enforcement, marking a new era in international climate policy. Scientists and environmental activists have cautiously welcomed the commitments, noting that implementation will be crucial to meeting the ambitious targets set.',
    region: 'world', 
    timestamp: '2 hours ago',
    perspectives: {
      neutral: 'The agreement represents a significant diplomatic achievement with measurable commitments from participating nations. Implementation mechanisms will determine its ultimate success.',
      right: 'While the agreement shows international cooperation, concerns remain about economic impacts on industry and the feasibility of rapid transitions without harming economic growth.',
      left: 'This agreement is a crucial step forward, though activists argue the targets should be more ambitious given the urgency of the climate crisis and the need for immediate action.'
    }
  },
  { 
    id: 2, 
    title: 'Technology Giants Unveil AI Breakthrough', 
    description: 'Major tech companies announce collaborative AI research initiative aimed at solving global challenges.',
    fullContent: 'Leading technology companies have announced a groundbreaking collaborative effort in artificial intelligence research. The initiative brings together researchers from multiple organizations to develop AI systems capable of addressing complex global challenges including disease prevention, food security, and climate modeling. The collaboration will share research findings openly while maintaining competitive commercial applications. Early results show promise in medical diagnostics and agricultural optimization. The companies have committed $5 billion to the initiative over the next three years, with an emphasis on ethical AI development and transparency in algorithmic decision-making.',
    region: 'world', 
    timestamp: '4 hours ago',
    perspectives: {
      neutral: 'The collaboration represents a significant investment in AI research with potential applications across multiple sectors. Open research sharing could accelerate technological advancement.',
      right: 'This partnership demonstrates how private enterprise and market competition drive innovation. The initiative shows responsible corporate leadership in emerging technologies.',
      left: 'While the research is promising, concerns about corporate control of AI technology and data privacy must be addressed. Public oversight and regulation remain essential.'
    }
  },
  { 
    id: 3, 
    title: 'International Trade Deal Signed', 
    description: 'New trade agreements promise to boost global economic cooperation and reduce tariffs.',
    fullContent: 'A comprehensive international trade agreement has been signed by 25 nations, aimed at reducing tariffs and promoting economic cooperation. The deal eliminates tariffs on over 90% of goods traded between participating countries and establishes new standards for digital commerce, intellectual property protection, and labor rights. Economic analysts predict the agreement could add $2 trillion to global GDP over the next decade. The deal includes provisions for environmental protection and workers\' rights, addressing some concerns raised by labor unions and environmental groups. Implementation will be gradual over five years to allow businesses to adapt.',
    region: 'world', 
    timestamp: '6 hours ago',
    perspectives: {
      neutral: 'The trade deal offers economic opportunities while including provisions for labor and environmental standards. Its impact will depend on implementation and enforcement.',
      right: 'This agreement promotes free trade and economic growth, reducing barriers that hinder business development and consumer choice. Market-driven solutions benefit all participants.',
      left: 'While economic growth is positive, vigilance is needed to ensure labor protections are enforced and that benefits are distributed equitably rather than concentrated among corporations.'
    }
  },
  { 
    id: 4, 
    title: 'Space Exploration Milestone Achieved', 
    description: 'International space agencies celebrate successful joint mission to establish lunar research station.',
    fullContent: 'International space agencies have successfully established a permanent research station on the lunar surface, marking a new chapter in space exploration. The station, built through collaboration between NASA, ESA, JAXA, and other partners, will serve as a base for scientific research and future deep space missions. The facility can house up to six astronauts and includes laboratories for studying lunar geology, astronomy, and developing technologies for Mars missions. This achievement demonstrates unprecedented international cooperation in space exploration and paves the way for sustained human presence beyond Earth.',
    region: 'world', 
    timestamp: '8 hours ago',
    perspectives: {
      neutral: 'The lunar station represents a significant scientific achievement through international cooperation, opening new possibilities for space research and exploration.',
      right: 'This milestone showcases the power of international collaboration while maintaining national prestige. Investment in space exploration drives technological innovation with practical Earth applications.',
      left: 'While scientifically impressive, questions arise about allocating such resources to space when pressing issues on Earth need funding. International cooperation model is commendable.'
    }
  },
  { 
    id: 5, 
    title: 'Global Health Initiative Launches', 
    description: 'WHO announces new program to improve healthcare access in developing nations.',
    fullContent: 'The World Health Organization has launched an ambitious new initiative to improve healthcare access in developing nations. The program focuses on building local healthcare infrastructure, training medical professionals, and ensuring access to essential medicines. With backing from governments and philanthropic organizations, the initiative aims to provide basic healthcare services to 500 million people in underserved regions over the next five years. The program emphasizes preventive care, maternal health, and infectious disease management, addressing root causes of health disparities.',
    region: 'world', 
    timestamp: '10 hours ago',
    perspectives: {
      neutral: 'The initiative addresses critical healthcare gaps in developing regions through infrastructure development and professional training, with measurable goals and international support.',
      right: 'The program shows how public-private partnerships can address healthcare needs. Market-based solutions and private sector efficiency should complement government efforts.',
      left: 'This initiative is essential for global health equity. However, more focus is needed on systemic issues like patent restrictions on medicines and pharmaceutical company profits.'
    }
  },
  
  // South American News
  { 
    id: 6, 
    title: 'Colombia Launches New Infrastructure Projects', 
    description: 'Government announces major investment in roads, bridges, and public transportation across the country.',
    fullContent: 'The Colombian government has announced a comprehensive infrastructure modernization program valued at $15 billion. The initiative includes construction of new highways connecting rural areas to urban centers, modernization of urban public transportation systems, and upgrades to port facilities to boost trade. The project is expected to create 200,000 jobs over five years and significantly reduce transportation costs for businesses. Special emphasis is placed on sustainable construction practices and improving access to remote communities. International development banks and private investors are partnering with the government to fund the projects.',
    region: 'south-america', 
    timestamp: '1 hour ago',
    perspectives: {
      neutral: 'The infrastructure program represents significant investment in Colombia\'s economic development with potential for job creation and improved connectivity. Implementation quality will be crucial.',
      right: 'This investment demonstrates commitment to economic growth through modern infrastructure. Public-private partnerships ensure efficient project execution and fiscal responsibility.',
      left: 'Infrastructure investment is positive, but concerns exist about environmental impacts and ensuring benefits reach rural and marginalized communities. Labor rights in construction must be protected.'
    }
  },
  { 
    id: 7, 
    title: 'Amazon Rainforest Conservation Efforts Expand', 
    description: 'Brazil and neighboring countries commit to expanded protection zones and sustainable development programs.',
    fullContent: 'Brazil, Colombia, Peru, and Ecuador have signed a landmark agreement to expand Amazon rainforest protection zones by 30%. The initiative establishes new protected areas, increases monitoring of illegal deforestation, and promotes sustainable economic alternatives for indigenous communities. The agreement includes a $3 billion international fund for conservation efforts and sustainable development projects. Indigenous leaders have been given significant roles in managing protected areas, recognizing their crucial role in forest preservation. The program aims to balance conservation with economic development needs of local populations.',
    region: 'south-america', 
    timestamp: '3 hours ago',
    perspectives: {
      neutral: 'The conservation agreement shows regional cooperation on environmental protection while addressing economic needs of local communities. Success depends on enforcement and sustainable alternatives.',
      right: 'Conservation is important, but must balance economic development needs. Market-based solutions and eco-tourism can protect the environment while supporting local economies.',
      left: 'This is a crucial step for climate action, though enforcement must be strengthened. Indigenous rights and anti-corporate deforestation measures need more emphasis to be truly effective.'
    }
  },
  { 
    id: 8, 
    title: 'South American Trade Alliance Strengthens', 
    description: 'Regional leaders meet to discuss economic cooperation and trade agreements across the continent.',
    fullContent: 'South American leaders have concluded a summit resulting in strengthened trade relationships and new economic cooperation frameworks. The alliance focuses on reducing trade barriers between member nations, coordinating infrastructure development, and presenting a unified voice in global trade negotiations. New agreements facilitate movement of goods and services across borders while protecting key industries. The alliance also addresses regional challenges including inflation, currency stability, and economic inequality. Leaders emphasize that regional cooperation strengthens individual nations\' positions in the global economy.',
    region: 'south-america', 
    timestamp: '5 hours ago',
    perspectives: {
      neutral: 'The trade alliance represents an effort to strengthen regional economic ties and improve South America\'s position in global trade. Implementation will test its effectiveness.',
      right: 'Regional cooperation through reduced trade barriers promotes economic growth and competitiveness. Free market principles within the alliance benefit all member nations.',
      left: 'Regional solidarity is positive, but agreements must prioritize workers\' rights and environmental standards over corporate profits. Wealth distribution within nations remains a concern.'
    }
  },
  { 
    id: 9, 
    title: 'Cultural Festival Celebrates Latin American Heritage', 
    description: 'Major cities across South America host events showcasing music, art, and traditions.',
    fullContent: 'Major cities across South America are hosting cultural festivals celebrating the region\'s rich heritage and diversity. The events feature traditional music performances, art exhibitions, culinary showcases, and educational programs about indigenous cultures. Organizers estimate over 5 million attendees across multiple countries. The festivals aim to preserve cultural traditions while promoting understanding between different communities. Young artists are given platforms to present contemporary interpretations of traditional art forms. The events have become important tourist attractions while serving as vehicles for cultural education and pride.',
    region: 'south-america', 
    timestamp: '7 hours ago',
    perspectives: {
      neutral: 'The cultural festivals celebrate regional heritage while attracting tourism and providing platforms for artists. They serve educational and economic purposes for participating communities.',
      right: 'Cultural celebrations strengthen national identity and pride while promoting tourism. Private sponsorship and entrepreneurship opportunities make these events economically sustainable.',
      left: 'These festivals are important for cultural preservation and indigenous rights recognition. More focus needed on including marginalized communities and ensuring commercial interests don\'t exploit traditions.'
    }
  },
  { 
    id: 10, 
    title: 'Renewable Energy Projects Gain Momentum', 
    description: 'Chile and Argentina lead the way with new solar and wind power initiatives across the region.',
    fullContent: 'Chile and Argentina are spearheading South America\'s renewable energy transition with massive solar and wind power projects. Combined investment of $20 billion will create some of the world\'s largest renewable energy installations. The projects aim to make both countries carbon-neutral by 2040 while creating thousands of jobs in the green energy sector. Other South American nations are developing similar initiatives, making the region a global leader in renewable energy adoption. The projects include technology transfer agreements to build local expertise and manufacturing capacity for renewable energy equipment.',
    region: 'south-america', 
    timestamp: '9 hours ago',
    perspectives: {
      neutral: 'The renewable energy projects represent significant investment in clean energy infrastructure with job creation potential. Technical and financial challenges will need to be addressed for full implementation.',
      right: 'These projects show how market forces and private investment drive clean energy adoption. Economic incentives and innovation, not mandates, lead to successful energy transitions.',
      left: 'Renewable energy investment is essential for climate action. Ensure projects benefit local communities, create quality jobs, and don\'t just serve corporate interests. Energy should be public good.'
    }
  },
];


export const EnhancedNewsHub: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<NewsRegion>('world');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [perspective, setPerspective] = useState<PoliticalPerspective>('neutral');

  const filteredNews = mockNews.filter(article => article.region === activeRegion);

  const openArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setPerspective('neutral'); // Reset to neutral when opening new article
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">News Hub</h2>
        <p className="text-gray-700 mb-6">
          Stay updated with the latest news from around the world and South America.
        </p>

        {/* Region Toggle Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveRegion('world')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeRegion === 'world'
                ? 'bg-blue-900 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌍 World News
          </button>
          <button
            onClick={() => setActiveRegion('south-america')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeRegion === 'south-america'
                ? 'bg-yellow-500 text-blue-900 shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌎 South American News
          </button>
        </div>

        {/* News Articles */}
        <div className="space-y-4">
          {filteredNews.map((article) => (
            <article key={article.id} className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {article.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Published {article.timestamp}
                </span>
                <button 
                  onClick={() => openArticle(article)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 font-semibold text-sm transition-colors"
                >
                  Read Full Article →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredNews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No news articles available for this region.
          </div>
        )}
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeArticle}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{selectedArticle.title}</h2>
                <span className="text-sm text-gray-500">Published {selectedArticle.timestamp}</span>
              </div>
              <button
                onClick={closeArticle}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Political Perspective Toggle */}
            {selectedArticle.perspectives && (
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-3">📰 Choose Reading Perspective:</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPerspective('neutral')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      perspective === 'neutral'
                        ? 'bg-gray-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    ⚖️ Neutral
                  </button>
                  <button
                    onClick={() => setPerspective('left')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      perspective === 'left'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    ⬅️ Left-Wing
                  </button>
                  <button
                    onClick={() => setPerspective('right')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      perspective === 'right'
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    ➡️ Right-Wing
                  </button>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-800 leading-relaxed mb-6">
                  {selectedArticle.fullContent}
                </p>

                {/* Perspective Analysis */}
                {selectedArticle.perspectives && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      {perspective === 'neutral' && '⚖️ Neutral Analysis'}
                      {perspective === 'left' && '⬅️ Left-Wing Perspective'}
                      {perspective === 'right' && '➡️ Right-Wing Perspective'}
                    </h3>
                    <p className="text-gray-700">
                      {selectedArticle.perspectives[perspective]}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                <button className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 font-semibold transition-colors">
                  💬 Comment on this Article
                </button>
                <button className="flex-1 bg-yellow-500 text-blue-900 py-3 rounded-lg hover:bg-yellow-600 font-semibold transition-colors">
                  📢 Share to Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
