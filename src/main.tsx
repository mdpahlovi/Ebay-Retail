import "swiper/css";
import "./index.css";

import axios from "axios";
import "regenerator-runtime/runtime";
import App from "./app.tsx";
import client from "./lib/client.ts";
import store from "./redux/store.ts";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloProvider } from "@apollo/client";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;
const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const newsapi = axios.create({ baseURL: "https://newsapi.org/v2", params: { apiKey } });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={google_client_id}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </GoogleOAuthProvider>
);

[
    {
        id: "abc-news",
        name: "ABC News",
        description: "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
    },
    {
        id: "abc-news-au",
        name: "ABC News (AU)",
        description:
            "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
    },
    {
        id: "aftenposten",
        name: "Aftenposten",
        description: "Norges ledende nettavis med alltid oppdaterte nyheter innenfor innenriks, utenriks, sport og kultur.",
    },
    {
        id: "al-jazeera-english",
        name: "Al Jazeera English",
        description:
            "News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.",
    },
    {
        id: "ansa",
        name: "ANSA.it",
        description:
            "Agenzia ANSA: ultime notizie, foto, video e approfondimenti su: cronaca, politica, economia, regioni, mondo, sport, calcio, cultura e tecnologia.",
    },
    {
        id: "argaam",
        name: "Argaam",
        description:
            "ارقام موقع متخصص في متابعة سوق الأسهم السعودي تداول - تاسي - مع تغطيه معمقة لشركات واسعار ومنتجات البتروكيماويات , تقارير مالية الاكتتابات الجديده ",
    },
    {
        id: "ars-technica",
        name: "Ars Technica",
        description: "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
    },
    {
        id: "ary-news",
        name: "Ary News",
        description:
            "ARY News is a Pakistani news channel committed to bring you up-to-the minute Pakistan news and featured stories from around Pakistan and all over the world.",
    },
    {
        id: "associated-press",
        name: "Associated Press",
        description: "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.",
    },
    {
        id: "australian-financial-review",
        name: "Australian Financial Review",
        description:
            "The Australian Financial Review reports the latest news from business, finance, investment and politics, updated in real time. It has a reputation for independent, award-winning journalism and is essential reading for the business and investor community.",
    },
    {
        id: "axios",
        name: "Axios",
        description:
            "Axios are a new media company delivering vital, trustworthy news and analysis in the most efficient, illuminating and shareable ways possible.",
    },
    {
        id: "bbc-news",
        name: "BBC News",
        description:
            "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.",
    },
    {
        id: "bbc-sport",
        name: "BBC Sport",
        description:
            "The home of BBC Sport online. Includes live sports coverage, breaking news, results, video, audio and analysis on Football, F1, Cricket, Rugby Union, Rugby League, Golf, Tennis and all the main world sports, plus major events such as the Olympic Games.",
    },
    {
        id: "bild",
        name: "Bild",
        description:
            "Die Seite 1 für aktuelle Nachrichten und Themen, Bilder und Videos aus den Bereichen News, Wirtschaft, Politik, Show, Sport, und Promis.",
    },
    {
        id: "blasting-news-br",
        name: "Blasting News (BR)",
        description:
            "Descubra a seção brasileira da Blasting News, a primeira revista feita pelo  público, com notícias globais e vídeos independentes. Junte-se a nós e torne- se um repórter.",
    },
    {
        id: "bleacher-report",
        name: "Bleacher Report",
        description:
            "Sports journalists and bloggers covering NFL, MLB, NBA, NHL, MMA, college football and basketball, NASCAR, fantasy sports and more. News, photos, mock drafts, game scores, player profiles and more!",
    },
    {
        id: "bloomberg",
        name: "Bloomberg",
        description:
            "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.",
    },
    {
        id: "breitbart-news",
        name: "Breitbart News",
        description: "Syndicated news and opinion website providing continuously updated headlines to top news and analysis sources.",
    },
    {
        id: "business-insider",
        name: "Business Insider",
        description:
            "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
    },
    {
        id: "business-insider-uk",
        name: "Business Insider (UK)",
        description:
            "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
    },
    {
        id: "buzzfeed",
        name: "Buzzfeed",
        description:
            "BuzzFeed is a cross-platform, global network for news and entertainment that generates seven billion views each month.",
    },
    {
        id: "cbc-news",
        name: "CBC News",
        description:
            "CBC News is the division of the Canadian Broadcasting Corporation responsible for the news gathering and production of news programs on the corporation's English-language operations, namely CBC Television, CBC Radio, CBC News Network, and CBC.ca.",
    },
    {
        id: "cbs-news",
        name: "CBS News",
        description:
            "CBS News: dedicated to providing the best in journalism under standards it pioneered at the dawn of radio and television and continue in the digital age.",
    },
    {
        id: "cnn",
        name: "CNN",
        description: "View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN",
    },
    {
        id: "cnn-es",
        name: "CNN Spanish",
        description:
            "Lee las últimas noticias e información sobre Latinoamérica, Estados Unidos, mundo, entretenimiento, política, salud, tecnología y deportes en CNNEspañol.com.",
    },
    {
        id: "crypto-coins-news",
        name: "Crypto Coins News",
        description:
            "Providing breaking cryptocurrency news - focusing on Bitcoin, Ethereum, ICOs, blockchain technology, and smart contracts.",
    },
    {
        id: "der-tagesspiegel",
        name: "Der Tagesspiegel",
        description: "Nachrichten, News und neueste Meldungen aus dem Inland und dem Ausland - aktuell präsentiert von tagesspiegel.de.",
    },
    {
        id: "die-zeit",
        name: "Die Zeit",
        description:
            "Aktuelle Nachrichten, Kommentare, Analysen und Hintergrundberichte aus Politik, Wirtschaft, Gesellschaft, Wissen, Kultur und Sport lesen Sie auf ZEIT ONLINE.",
    },
    {
        id: "el-mundo",
        name: "El Mundo",
        description: "Noticias, actualidad, álbumes, debates, sociedad, servicios, entretenimiento y última hora en España y el mundo.",
    },
    {
        id: "engadget",
        name: "Engadget",
        description: "Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics.",
    },
    {
        id: "entertainment-weekly",
        name: "Entertainment Weekly",
        description:
            "Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers.",
    },
    {
        id: "espn",
        name: "ESPN",
        description:
            "ESPN has up-to-the-minute sports news coverage, scores, highlights and commentary for NFL, MLB, NBA, College Football, NCAA Basketball and more.",
    },
    {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
        description:
            "ESPN Cricinfo provides the most comprehensive cricket coverage available including live ball-by-ball commentary, news, unparalleled statistics, quality editorial comment and analysis.",
    },
    {
        id: "financial-post",
        name: "Financial Post",
        description:
            "Find the latest happenings in the Canadian Financial Sector and stay up to date with changing trends in Business Markets. Read trading and investing advice from professionals.",
    },
    {
        id: "focus",
        name: "Focus",
        description: "Minutenaktuelle Nachrichten und Service-Informationen von Deutschlands modernem Nachrichtenmagazin.",
    },
    {
        id: "football-italia",
        name: "Football Italia",
        description: "Italian football news, analysis, fixtures and results for the latest from Serie A, Serie B and the Azzurri.",
    },
    {
        id: "fortune",
        name: "Fortune",
        description: "Fortune 500 Daily and Breaking Business News",
    },
    {
        id: "four-four-two",
        name: "FourFourTwo",
        description:
            "The latest football news, in-depth features, tactical and statistical analysis from FourFourTwo, the UK&#039;s favourite football monthly.",
    },
    {
        id: "fox-news",
        name: "Fox News",
        description:
            "Breaking News, Latest News and Current News from FOXNews.com. Breaking news and video. Latest Current News: U.S., World, Entertainment, Health, Business, Technology, Politics, Sports.",
    },
    {
        id: "fox-sports",
        name: "Fox Sports",
        description: "Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports.",
    },
    {
        id: "globo",
        name: "Globo",
        description:
            "Só na globo.com você encontra tudo sobre o conteúdo e marcas do Grupo Globo. O melhor acervo de vídeos online sobre entretenimento, esportes e jornalismo do Brasil.",
    },
    {
        id: "google-news",
        name: "Google News",
        description: "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.",
    },
    {
        id: "google-news-ar",
        name: "Google News (Argentina)",
        description: "Completa cobertura actualizada de noticias agregadas a partir de fuentes de todo el mundo por Google Noticias.",
    },
    {
        id: "google-news-au",
        name: "Google News (Australia)",
        description: "Comprehensive, up-to-date Australia news coverage, aggregated from sources all over the world by Google News.",
    },
    {
        id: "google-news-br",
        name: "Google News (Brasil)",
        description: "Cobertura jornalística abrangente e atualizada, agregada de fontes do mundo inteiro pelo Google Notícias.",
    },
    {
        id: "google-news-ca",
        name: "Google News (Canada)",
        description: "Comprehensive, up-to-date Canada news coverage, aggregated from sources all over the world by Google News.",
    },
    {
        id: "google-news-fr",
        name: "Google News (France)",
        description:
            "Informations complètes et à jour, compilées par Google Actualités à partir de sources d&#39;actualités du monde entier.",
    },
    {
        id: "google-news-in",
        name: "Google News (India)",
        description: "Comprehensive, up-to-date India news coverage, aggregated from sources all over the world by Google News.",
    },
    {
        id: "google-news-is",
        name: "Google News (Israel)",
        description: "כיסוי מקיף ועדכני של חדשות שהצטברו ממקורות בכל העולם על ידי &#39;חדשות Google&#39;.",
    },
    {
        id: "google-news-it",
        name: "Google News (Italy)",
        description:
            "Copertura giornalistica completa e aggiornata ottenuta combinando fonti di notizie in tutto il mondo attraverso Google News.",
    },
    {
        id: "google-news-ru",
        name: "Google News (Russia)",
        description: "Исчерпывающая и актуальная информация, собранная службой &quot;Новости Google&quot; со всего света.",
    },
    {
        id: "google-news-sa",
        name: "Google News (Saudi Arabia)",
        description: "تغطية شاملة ومتجددة للأخبار، تم جمعها من مصادر أخبار من جميع أنحاء العالم بواسطة أخبار Google.",
    },
    {
        id: "google-news-uk",
        name: "Google News (UK)",
        description: "Comprehensive, up-to-date UK news coverage, aggregated from sources all over the world by Google News.",
    },
    {
        id: "goteborgs-posten",
        name: "Göteborgs-Posten",
        description: "Göteborgs-Posten, abbreviated GP, is a major Swedish language daily newspaper published in Gothenburg, Sweden.",
    },
    {
        id: "gruenderszene",
        name: "Gruenderszene",
        description: "Online-Magazin für Startups und die digitale Wirtschaft. News und Hintergründe zu Investment, VC und Gründungen.",
    },
    {
        id: "hacker-news",
        name: "Hacker News",
        description:
            "Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by Paul Graham's investment fund and startup incubator, Y Combinator. In general, content that can be submitted is defined as \"anything that gratifies one's intellectual curiosity\".",
    },
    {
        id: "handelsblatt",
        name: "Handelsblatt",
        description:
            "Auf Handelsblatt lesen sie Nachrichten über Unternehmen, Finanzen, Politik und Technik. Verwalten Sie Ihre Finanzanlagen mit Hilfe unserer Börsenkurse.",
    },
    {
        id: "ign",
        name: "IGN",
        description:
            "IGN is your site for Xbox One, PS4, PC, Wii-U, Xbox 360, PS3, Wii, 3DS, PS Vita and iPhone games with expert reviews, news, previews, trailers, cheat codes, wiki guides and walkthroughs.",
    },
    {
        id: "il-sole-24-ore",
        name: "Il Sole 24 Ore",
        description:
            "Notizie di economia, cronaca italiana ed estera, quotazioni borsa in tempo reale e di finanza, norme e tributi, fondi e obbligazioni, mutui, prestiti e lavoro a cura de Il Sole 24 Ore.",
    },
    {
        id: "independent",
        name: "Independent",
        description:
            "National morning quality (tabloid) includes free online access to news and supplements. Insight by Robert Fisk and various other columnists.",
    },
    {
        id: "infobae",
        name: "Infobae",
        description:
            "Noticias de Argentina y del mundo en tiempo real. Información, videos y fotos sobre los hechos más relevantes y sus protagonistas. Léelo antes en infobae.",
    },
    {
        id: "info-money",
        name: "InfoMoney",
        description:
            "No InfoMoney você encontra tudo o que precisa sobre dinheiro. Ações, investimentos, bolsas de valores e muito mais. Aqui você encontra informação que vale dinheiro!",
    },
    {
        id: "la-gaceta",
        name: "La Gaceta",
        description:
            "El diario de Tucumán, noticias 24 horas online - San Miguel de Tucumán - Argentina - Ultimo momento - Ultimas noticias.",
    },
    {
        id: "la-nacion",
        name: "La Nacion",
        description: "Información confiable en Internet. Noticias de Argentina y del mundo - ¡Informate ya!",
    },
    {
        id: "la-repubblica",
        name: "La Repubblica",
        description:
            "Breaking News, Latest News and Current News from FOXNews.com. Breaking news and video. Latest Current News: U.S., World, Entertainment, Health, Business, Technology, Politics, Sports.",
    },
    {
        id: "le-monde",
        name: "Le Monde",
        description:
            "Les articles du journal et toute l'actualit&eacute; en continu : International, France, Soci&eacute;t&eacute;, Economie, Culture, Environnement, Blogs ...",
    },
    {
        id: "lenta",
        name: "Lenta",
        description: "Новости, статьи, фотографии, видео. Семь дней в неделю, 24 часа в сутки.",
    },
    {
        id: "lequipe",
        name: "L'equipe",
        description:
            "Le sport en direct sur L'EQUIPE.fr. Les informations, résultats et classements de tous les sports. Directs commentés, images et vidéos à regarder et à partager !",
    },
    {
        id: "les-echos",
        name: "Les Echos",
        description: "Toute l'actualité économique, financière et boursière française et internationale sur Les Echos.fr",
    },
    {
        id: "liberation",
        name: "Libération",
        description: "Toute l'actualité en direct - photos et vidéos avec Libération",
    },
    {
        id: "marca",
        name: "Marca",
        description:
            "La mejor información deportiva en castellano actualizada minuto a minuto en noticias, vídeos, fotos, retransmisiones y resultados en directo.",
    },
    {
        id: "mashable",
        name: "Mashable",
        description: "Mashable is a global, multi-platform media and entertainment company.",
    },
    {
        id: "medical-news-today",
        name: "Medical News Today",
        description: "Medical news and health news headlines posted throughout the day, every day.",
    },
    {
        id: "msnbc",
        name: "MSNBC",
        description:
            "Breaking news and in-depth analysis of the headlines, as well as commentary and informed perspectives from The Rachel Maddow Show, Morning Joe & more.",
    },
    {
        id: "mtv-news",
        name: "MTV News",
        description:
            "The ultimate news source for music, celebrity, entertainment, movies, and current events on the web. It's pop culture on steroids.",
    },
    {
        id: "mtv-news-uk",
        name: "MTV News (UK)",
        description: "All the latest celebrity news, gossip, exclusive interviews and pictures from the world of music and entertainment.",
    },
    {
        id: "national-geographic",
        name: "National Geographic",
        description: "Reporting our world daily: original nature and science news from National Geographic.",
    },
    {
        id: "national-review",
        name: "National Review",
        description: "National Review: Conservative News, Opinion, Politics, Policy, & Current Events.",
    },
    {
        id: "nbc-news",
        name: "NBC News",
        description: "Breaking news, videos, and the latest top stories in world news, business, politics, health and pop culture.",
    },
    {
        id: "news24",
        name: "News24",
        description:
            "South Africa's premier news source, provides breaking news on national, world, Africa, sport, entertainment, technology and more.",
    },
    {
        id: "new-scientist",
        name: "New Scientist",
        description:
            "Breaking science and technology news from around the world. Exclusive stories and expert analysis on space, technology, health, physics, life and Earth.",
    },
    {
        id: "news-com-au",
        name: "News.com.au",
        description:
            "We say what people are thinking and cover the issues that get people talking balancing Australian and global moments — from politics to pop culture.",
    },
    {
        id: "newsweek",
        name: "Newsweek",
        description:
            "Newsweek provides in-depth analysis, news and opinion about international issues, technology, business, culture and politics.",
    },
    {
        id: "new-york-magazine",
        name: "New York Magazine",
        description:
            "NYMAG and New York magazine cover the new, the undiscovered, the next in politics, culture, food, fashion, and behavior nationally, through a New York lens.",
    },
    {
        id: "next-big-future",
        name: "Next Big Future",
        description:
            "Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.",
    },
    {
        id: "nfl-news",
        name: "NFL News",
        description: "The official source for NFL news, schedules, stats, scores and more.",
    },
    {
        id: "nhl-news",
        name: "NHL News",
        description:
            "The most up-to-date breaking hockey news from the official source including interviews, rumors, statistics and schedules.",
    },
    {
        id: "nrk",
        name: "NRK",
        description:
            "NRK er Norges største tilbud på nett: nyheter fra Norge og verden, lokalnyheter, radio- og tv-program, podcast, vær, helse-, kultur-, underholdning-, humor- og debattstoff.",
    },
    {
        id: "politico",
        name: "Politico",
        description: "Political news about Congress, the White House, campaigns, lobbyists and issues.",
    },
    {
        id: "polygon",
        name: "Polygon",
        description:
            "Polygon is a gaming website in partnership with Vox Media. Our culture focused site covers games, their creators, the fans, trending stories and entertainment news.",
    },
    {
        id: "rbc",
        name: "RBC",
        description:
            "Главные новости политики, экономики и бизнеса, комментарии аналитиков, финансовые данные с российских и мировых биржевых систем на сайте rbc.ru.",
    },
    {
        id: "recode",
        name: "Recode",
        description:
            "Get the latest independent tech news, reviews and analysis from Recode with the most informed and respected journalists in technology and media.",
    },
    {
        id: "reddit-r-all",
        name: "Reddit /r/all",
        description:
            "Reddit is an entertainment, social news networking service, and news website. Reddit's registered community members can submit content, such as text posts or direct links.",
    },
    {
        id: "reuters",
        name: "Reuters",
        description:
            "Reuters.com brings you the latest news from around the world, covering breaking news in business, politics, entertainment, technology, video and pictures.",
    },
    {
        id: "rt",
        name: "RT",
        description:
            "Актуальная картина дня на RT: круглосуточное ежедневное обновление новостей политики, бизнеса, финансов, спорта, науки, культуры. Онлайн-репортажи с места событий. Комментарии экспертов, актуальные интервью, фото и видео репортажи.",
    },
    {
        id: "rte",
        name: "RTE",
        description:
            "Get all of the latest breaking local and international news stories as they happen, with up to the minute updates and analysis, from Ireland's National Broadcaster.",
    },
    {
        id: "rtl-nieuws",
        name: "RTL Nieuws",
        description:
            "Volg het nieuws terwijl het gebeurt. RTL Nieuws informeert haar lezers op een onafhankelijke, boeiende en toegankelijke wijze over belangrijke ontwikkelingen in eigen land en de rest van de wereld.",
    },
    {
        id: "sabq",
        name: "SABQ",
        description: "صحيفة الكترونية سعودية هدفها السبق في نقل الحدث بمهنية ومصداقية خدمة للوطن والمواطن.",
    },
    {
        id: "spiegel-online",
        name: "Spiegel Online",
        description:
            "Deutschlands führende Nachrichtenseite. Alles Wichtige aus Politik, Wirtschaft, Sport, Kultur, Wissenschaft, Technik und mehr.",
    },
    {
        id: "svenska-dagbladet",
        name: "Svenska Dagbladet",
        description: "Sveriges ledande mediesajt - SvD.se. Svenska Dagbladets nyhetssajt låter läsarna ta plats och fördjupar nyheterna.",
    },
    {
        id: "t3n",
        name: "T3n",
        description: "Das Online-Magazin bietet Artikel zu den Themen E-Business, Social Media, Startups und Webdesign.",
    },
    {
        id: "talksport",
        name: "TalkSport",
        description:
            "Tune in to the world's biggest sports radio station - Live Premier League football coverage, breaking sports news, transfer rumours &amp; exclusive interviews.",
    },
    {
        id: "techcrunch",
        name: "TechCrunch",
        description:
            "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
    },
    {
        id: "techcrunch-cn",
        name: "TechCrunch (CN)",
        description:
            "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
    },
    {
        id: "techradar",
        name: "TechRadar",
        description: "The latest technology news and reviews, covering computing, home entertainment systems, gadgets and more.",
    },
    {
        id: "the-american-conservative",
        name: "The American Conservative",
        description: "Realism and reform. A new voice for a new generation of conservatives.",
    },
    {
        id: "the-globe-and-mail",
        name: "The Globe And Mail",
        description: "The Globe and Mail offers the most authoritative news in Canada, featuring national and international news.",
    },
    {
        id: "the-hill",
        name: "The Hill",
        description:
            "The Hill is a top US political website, read by the White House and more lawmakers than any other site -- vital for policy, politics and election campaigns.",
    },
    {
        id: "the-hindu",
        name: "The Hindu",
        description:
            "The Hindu. latest news, analysis, comment, in-depth coverage of politics, business, sport, environment, cinema and arts from India's national newspaper.",
    },
    {
        id: "the-huffington-post",
        name: "The Huffington Post",
        description:
            "The Huffington Post is a politically liberal American online news aggregator and blog that has both localized and international editions founded by Arianna Huffington, Kenneth Lerer, Andrew Breitbart, and Jonah Peretti, featuring columnists.",
    },
    {
        id: "the-irish-times",
        name: "The Irish Times",
        description:
            "The Irish Times online. Latest news including sport, analysis, business, weather and more from the definitive brand of quality news in Ireland.",
    },
    {
        id: "the-jerusalem-post",
        name: "The Jerusalem Post",
        description:
            "The Jerusalem Post is the leading online newspaper for English speaking Jewry since 1932, bringing news and updates from the Middle East and all over the Jewish world.",
    },
    {
        id: "the-lad-bible",
        name: "The Lad Bible",
        description:
            "The LAD Bible is one of the largest community for guys aged 16-30 in the world. Send us your funniest pictures and videos!",
    },
    {
        id: "the-next-web",
        name: "The Next Web",
        description:
            "The Next Web is one of the world’s largest online publications that delivers an international perspective on the latest news about Internet technology, business and culture.",
    },
    {
        id: "the-sport-bible",
        name: "The Sport Bible",
        description:
            "TheSPORTbible is one of the largest communities for sports fans across the world. Send us your sporting pictures and videos!",
    },
    {
        id: "the-times-of-india",
        name: "The Times of India",
        description:
            "Times of India brings the Latest News and Top Breaking headlines on Politics and Current Affairs in India and around the World, Sports, Business, Bollywood News and Entertainment, Science, Technology, Health and Fitness news, Cricket and opinions from leading columnists.",
    },
    {
        id: "the-verge",
        name: "The Verge",
        description: "The Verge covers the intersection of technology, science, art, and culture.",
    },
    {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
        description:
            "WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting.",
    },
    {
        id: "the-washington-post",
        name: "The Washington Post",
        description:
            "Breaking news and analysis on politics, business, world national news, entertainment more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more.",
    },
    {
        id: "the-washington-times",
        name: "The Washington Times",
        description: "The Washington Times delivers breaking news and commentary on the issues that affect the future of our nation.",
    },
    {
        id: "time",
        name: "Time",
        description:
            "Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news.",
    },
    {
        id: "usa-today",
        name: "USA Today",
        description: "Get the latest national, international, and political news at USATODAY.com.",
    },
    {
        id: "vice-news",
        name: "Vice News",
        description:
            'Vice News is Vice Media, Inc.\'s current affairs channel, producing daily documentary essays and video through its website and YouTube channel. It promotes itself on its coverage of "under - reported stories".',
    },
    {
        id: "wired",
        name: "Wired",
        description:
            "Wired is a monthly American magazine, published in print and online editions, that focuses on how emerging technologies affect culture, the economy, and politics.",
    },
    {
        id: "wired-de",
        name: "Wired.de",
        description: "Wired reports on how emerging technologies affect culture, the economy and politics.",
    },
    {
        id: "wirtschafts-woche",
        name: "Wirtschafts Woche",
        description:
            "Das Online-Portal des führenden Wirtschaftsmagazins in Deutschland. Das Entscheidende zu Unternehmen, Finanzen, Erfolg und Technik.",
    },
    {
        id: "xinhua-net",
        name: "Xinhua Net",
        description:
            "中国主要重点新闻网站,依托新华社遍布全球的采编网络,记者遍布世界100多个国家和地区,地方频道分布全国31个省市自治区,每天24小时同时使用6种语言滚动发稿,权威、准确、及时播发国内外重要新闻和重大突发事件,受众覆盖200多个国家和地区,发展论坛是全球知名的中文论坛。",
    },
    {
        id: "ynet",
        name: "Ynet",
        description:
            "ynet דף הבית: אתר החדשות המוביל בישראל מבית ידיעות אחרונות. סיקור מלא של חדשות מישראל והעולם, ספורט, כלכלה, תרבות, אוכל, מדע וטבע, כל מה שקורה וכל מה שמעניין ב ynet.",
    },
];
