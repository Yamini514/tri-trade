/* ============================================================
   HeyFund — Central mock data
   All copy & numbers used across the site live here.
   ============================================================ */

/* ---------- Indices ---------- */

export const indices = [
  { symbol: "NIFTY", name: "Nifty 50", price: 24218.6, change: 142.35, changePercent: 0.59 },
  { symbol: "BANKNIFTY", name: "Nifty Bank", price: 52106.4, change: -188.2, changePercent: -0.36 },
  { symbol: "SENSEX", name: "BSE Sensex", price: 79476.19, change: 421.08, changePercent: 0.53 },
  { symbol: "FINNIFTY", name: "Nifty Financial", price: 23344.15, change: 64.9, changePercent: 0.28 },
  { symbol: "MIDCPNIFTY", name: "Nifty Midcap", price: 12890.05, change: -53.45, changePercent: -0.41 },
];

export const tickerItems = [
  { symbol: "NIFTY 50", price: 24218.6, changePercent: 0.59 },
  { symbol: "BANKNIFTY", price: 52106.4, changePercent: -0.36 },
  { symbol: "SENSEX", price: 79476.19, changePercent: 0.53 },
  { symbol: "FINNIFTY", price: 23344.15, changePercent: 0.28 },
  { symbol: "MIDCPNIFTY", price: 12890.05, changePercent: -0.41 },
  { symbol: "RELIANCE", price: 2945.3, changePercent: 1.12 },
  { symbol: "HDFCBANK", price: 1678.55, changePercent: -0.44 },
  { symbol: "TCS", price: 4120.0, changePercent: 0.81 },
  { symbol: "INFY", price: 1842.7, changePercent: 1.34 },
  { symbol: "ICICIBANK", price: 1244.9, changePercent: 0.62 },
  { symbol: "TATAMOTORS", price: 982.15, changePercent: 2.05 },
  { symbol: "SBIN", price: 824.4, changePercent: -0.73 },
  { symbol: "BHARTIARTL", price: 1556.2, changePercent: 0.45 },
  { symbol: "GOLD", price: 71840, changePercent: 0.18 },
  { symbol: "USDINR", price: 83.42, changePercent: -0.05 },
];

/* ---------- Live calls (direction: LONG|SHORT, status: HIT|ACTIVE|SL) ---------- */

export const liveCalls = [
  { id: "c1", symbol: "RELIANCE", direction: "LONG", status: "ACTIVE", entry: 2942, target: 2985, sl: 2918, segment: "Intraday", postedAt: "09:42" },
  { id: "c2", symbol: "BANKNIFTY 52000 CE", direction: "LONG", status: "HIT", entry: 184, target: 232, sl: 158, segment: "Options", postedAt: "09:58" },
  { id: "c3", symbol: "TATAMOTORS", direction: "SHORT", status: "SL", entry: 988, target: 952, sl: 1002, segment: "Intraday", postedAt: "10:15" },
  { id: "c4", symbol: "INFY", direction: "LONG", status: "ACTIVE", entry: 1838, target: 1880, sl: 1815, segment: "Swing", postedAt: "10:31" },
  { id: "c5", symbol: "NIFTY 24200 PE", direction: "SHORT", status: "HIT", entry: 96, target: 64, sl: 114, segment: "Options", postedAt: "11:04" },
  { id: "c6", symbol: "SBIN", direction: "LONG", status: "ACTIVE", entry: 822, target: 846, sl: 810, segment: "Intraday", postedAt: "11:22" },
  { id: "c7", symbol: "HDFCBANK", direction: "SHORT", status: "HIT", entry: 1686, target: 1654, sl: 1702, segment: "Intraday", postedAt: "12:09" },
  { id: "c8", symbol: "ICICIBANK", direction: "LONG", status: "ACTIVE", entry: 1240, target: 1268, sl: 1226, segment: "Swing", postedAt: "12:48" },
];

/* ---------- Trade setups (Desk section) ---------- */

export const tradeSetups = [
  {
    id: "s1",
    symbol: "RELIANCE",
    type: "Intraday",
    direction: "LONG",
    confidence: "High",
    entry: 2942,
    target: 2985,
    sl: 2918,
    rr: "1 : 1.8",
    note: "Breakout above VWAP with rising volume; reclaim of prior-day high.",
  },
  {
    id: "s2",
    symbol: "BANKNIFTY 52000 CE",
    type: "Options",
    direction: "LONG",
    confidence: "Medium",
    entry: 184,
    target: 232,
    sl: 158,
    rr: "1 : 1.8",
    note: "Bullish OI unwinding at 52000; index holding above opening range.",
  },
  {
    id: "s3",
    symbol: "INFY",
    type: "Swing",
    direction: "LONG",
    confidence: "High",
    entry: 1838,
    target: 1925,
    sl: 1798,
    rr: "1 : 2.2",
    note: "Cup-and-handle on the daily; sector rotation into IT favourable.",
  },
];

/* ---------- Win / loss (Mon–Fri) ---------- */

export const winLossData = [
  { day: "Mon", wins: 8, losses: 3 },
  { day: "Tue", wins: 11, losses: 2 },
  { day: "Wed", wins: 7, losses: 4 },
  { day: "Thu", wins: 12, losses: 3 },
  { day: "Fri", wins: 9, losses: 2 },
];

/* ---------- Testimonials ---------- */

export const testimonials = [
  {
    id: "t1",
    quote:
      "The calls are clear, timed well, and always come with a stop-loss. I finally trade with a plan instead of emotion.",
    name: "Rohan Mehta",
    handle: "@rohan_trades",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Pre-market briefs alone are worth the subscription. I know my levels before the bell rings every single day.",
    name: "Priya Nair",
    handle: "@priyacharts",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "What sold me is the transparency — wins and losses both logged. No screenshots-after-the-fact nonsense.",
    name: "Arjun Verma",
    handle: "@arjun_v",
    rating: 4,
  },
];

/* ---------- FAQ ---------- */

export const faqs = [
  {
    q: "What does HeyFund do?",
    a: "HeyFund publishes high-conviction intraday, options, and swing trade ideas for the Indian markets, paired with education and tools. Every call ships with an entry, target, and stop-loss so you can trade with a defined plan.",
  },
  {
    q: "How are trade calls shared?",
    a: "Calls are pushed instantly to our verified Telegram channel and mirrored on your dashboard. You get a pre-market brief each morning and real-time updates as setups trigger, hit targets, or stop out.",
  },
  {
    q: "What is your historical win rate?",
    a: "Our published track record sits at 70%+ across logged calls. We record both wins and losses transparently — you can review the full ledger before deciding to subscribe.",
  },
  {
    q: "Can beginners join?",
    a: "Absolutely. The Learn hub covers candlestick patterns, strategies, and a full glossary, while our position-size and stop-loss tools help you risk responsibly from day one.",
  },
  {
    q: "What markets do you cover?",
    a: "We focus on NSE & BSE — index futures and options (NIFTY, BANKNIFTY, FINNIFTY), large-cap equities, and select midcaps. We do not provide tips on illiquid penny stocks.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "You can cancel anytime from your dashboard in two clicks — no phone calls, no retention scripts. Your access continues until the end of the billing period.",
  },
];

/* ---------- Pricing (annual = per-month equivalent billed annually) ---------- */

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    tagline: "Get a feel for the desk",
    monthly: 0,
    annual: 0,
    featured: false,
    cta: "Join Free",
    features: [
      "1–2 sample calls per week",
      "Daily market snapshot",
      "Access to the Learn hub",
      "Basic trading tools",
      "Community Telegram (read-only)",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For the active retail trader",
    monthly: 1499,
    annual: 1199,
    featured: true,
    cta: "Start Pro",
    features: [
      "All intraday & options calls",
      "Live push to Telegram",
      "Pre-market briefs daily",
      "Full P&L dashboard",
      "All calculators & tools",
      "Priority support",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "Maximum conviction & access",
    monthly: 3499,
    annual: 2799,
    featured: false,
    cta: "Go Elite",
    features: [
      "Everything in Pro",
      "Swing & positional calls",
      "Direct analyst Q&A",
      "Weekly strategy webinars",
      "Custom risk planning",
      "Early access to new tools",
    ],
  },
];

/* ---------- Stats ---------- */

export const stats = [
  { label: "Members", value: 2300, suffix: "+" },
  { label: "Calls published", value: 3200, suffix: "+" },
  { label: "Win rate", value: 70, suffix: "%+" },
  { label: "Years experience", value: 12, suffix: "+ yrs" },
];

/* ---------- Steps ---------- */

export const steps = [
  {
    n: 1,
    title: "Join the Channel",
    body: "Sign up and get instant access to our verified Telegram channel and your personal dashboard.",
  },
  {
    n: 2,
    title: "Receive the Call",
    body: "Get high-conviction setups pushed in real time — each with a clear entry, target, and stop-loss.",
  },
  {
    n: 3,
    title: "Execute & Profit",
    body: "Place the trade on your broker, manage risk with our tools, and track every result on your dashboard.",
  },
];

/* ---------- Media carousel (type: youtube|instagram|photo) ---------- */

export const mediaItems = [
  {
    id: "m1",
    type: "youtube",
    title: "Weekly Market Outlook",
    subtitle: "How to read the Nifty range for the week ahead",
    thumbColor: "#C9463B",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: "m2",
    type: "instagram",
    title: "60-Second Setup",
    subtitle: "Spotting a clean intraday breakout on BankNifty",
    thumbColor: "#1A6B3C",
  },
  {
    id: "m3",
    type: "photo",
    title: "Inside the Desk",
    subtitle: "A morning at HeyFund — pre-market routine",
    thumbColor: "#B8962E",
  },
  {
    id: "m4",
    type: "youtube",
    title: "Options Masterclass",
    subtitle: "Decoding open interest and max pain",
    thumbColor: "#1A1A1A",
    embedId: "dQw4w9WgXcQ",
  },
];

/* ---------- Candlestick patterns (29) — sentiment: bullish|bearish|neutral ---------- */

export const candlestickPatterns = [
  { name: "Hammer", sentiment: "bullish", candles: 1, description: "Small body with a long lower wick; signals rejection of lower prices after a downtrend." },
  { name: "Inverted Hammer", sentiment: "bullish", candles: 1, description: "Long upper wick after a decline; potential bullish reversal pending confirmation." },
  { name: "Bullish Engulfing", sentiment: "bullish", candles: 2, description: "A large green candle fully engulfs the prior red candle, signalling buyer takeover." },
  { name: "Piercing Line", sentiment: "bullish", candles: 2, description: "Green candle closes above the midpoint of the prior red candle." },
  { name: "Morning Star", sentiment: "bullish", candles: 3, description: "Three-candle reversal: long red, small-bodied star, then a strong green close." },
  { name: "Three White Soldiers", sentiment: "bullish", candles: 3, description: "Three consecutive long green candles with higher closes — strong uptrend signal." },
  { name: "Bullish Harami", sentiment: "bullish", candles: 2, description: "Small green candle contained within the prior large red body; momentum shift." },
  { name: "Tweezer Bottom", sentiment: "bullish", candles: 2, description: "Two candles with matching lows, marking a support floor." },
  { name: "Dragonfly Doji", sentiment: "bullish", candles: 1, description: "Doji with a long lower wick and no upper wick; bullish at support." },
  { name: "Morning Doji Star", sentiment: "bullish", candles: 3, description: "Morning star variant where the middle candle is a doji — stronger reversal." },
  { name: "Bullish Marubozu", sentiment: "bullish", candles: 1, description: "Full-bodied green candle with no wicks; relentless buying pressure." },
  { name: "Rising Three Methods", sentiment: "bullish", candles: 5, description: "Continuation: a long green candle, three small reds, then another strong green." },
  { name: "Three Inside Up", sentiment: "bullish", candles: 3, description: "Bullish harami followed by a confirming green candle." },
  { name: "Hanging Man", sentiment: "bearish", candles: 1, description: "Hammer shape after an uptrend; warns of a potential top." },
  { name: "Shooting Star", sentiment: "bearish", candles: 1, description: "Long upper wick after a rally; sellers rejected higher prices." },
  { name: "Bearish Engulfing", sentiment: "bearish", candles: 2, description: "A large red candle engulfs the prior green; sellers seize control." },
  { name: "Dark Cloud Cover", sentiment: "bearish", candles: 2, description: "Red candle opens above and closes below the midpoint of the prior green." },
  { name: "Evening Star", sentiment: "bearish", candles: 3, description: "Long green, small star, then a strong red close — bearish reversal." },
  { name: "Three Black Crows", sentiment: "bearish", candles: 3, description: "Three long red candles with lower closes — strong downtrend signal." },
  { name: "Bearish Harami", sentiment: "bearish", candles: 2, description: "Small red candle within the prior large green body; weakening momentum." },
  { name: "Tweezer Top", sentiment: "bearish", candles: 2, description: "Two candles sharing the same high, marking resistance." },
  { name: "Gravestone Doji", sentiment: "bearish", candles: 1, description: "Doji with a long upper wick and no lower wick; bearish at resistance." },
  { name: "Evening Doji Star", sentiment: "bearish", candles: 3, description: "Evening star where the middle candle is a doji — stronger top signal." },
  { name: "Bearish Marubozu", sentiment: "bearish", candles: 1, description: "Full-bodied red candle with no wicks; relentless selling pressure." },
  { name: "Falling Three Methods", sentiment: "bearish", candles: 5, description: "Continuation: a long red, three small greens, then another strong red." },
  { name: "Doji", sentiment: "neutral", candles: 1, description: "Open and close nearly equal; indecision between buyers and sellers." },
  { name: "Spinning Top", sentiment: "neutral", candles: 1, description: "Small body with wicks on both sides; market indecision." },
  { name: "High Wave", sentiment: "neutral", candles: 1, description: "Very long wicks both sides with a tiny body; extreme volatility and indecision." },
  { name: "Long-Legged Doji", sentiment: "neutral", candles: 1, description: "Doji with long wicks on both ends; a stand-off in the market." },
];

/* ---------- Strategies (8) ---------- */

export const strategies = [
  {
    id: "st1",
    name: "Opening Range Breakout",
    timeframe: "Intraday · 5m",
    type: "Breakout",
    difficulty: "Beginner",
    summary: "Trade the break of the first 15-minute high/low with the trend.",
    rules: [
      "Mark the high and low of the first 15 minutes.",
      "Go long on a 5-min close above the range high; short below the low.",
      "Stop on the opposite side of the range.",
      "Target 1.5× the range height; trail the rest.",
    ],
  },
  {
    id: "st2",
    name: "VWAP Reversion",
    timeframe: "Intraday · 5m",
    type: "Mean reversion",
    difficulty: "Intermediate",
    summary: "Fade extended moves back to the volume-weighted average price.",
    rules: [
      "Wait for price to extend 1%+ from VWAP.",
      "Enter on the first rejection candle back toward VWAP.",
      "Stop beyond the extreme of the move.",
      "Target the VWAP; partial at the band, runner at VWAP.",
    ],
  },
  {
    id: "st3",
    name: "Moving Average Pullback",
    timeframe: "Swing · Daily",
    type: "Trend following",
    difficulty: "Beginner",
    summary: "Buy healthy pullbacks to the 20/50 EMA in an uptrend.",
    rules: [
      "Confirm 20 EMA above 50 EMA and rising.",
      "Wait for a pullback to the 20 EMA.",
      "Enter on a bullish reversal candle.",
      "Stop below the 50 EMA; target prior swing high then trail.",
    ],
  },
  {
    id: "st4",
    name: "Bull Call Spread",
    timeframe: "Options · Weekly",
    type: "Options",
    difficulty: "Intermediate",
    summary: "Defined-risk bullish bet that caps cost and profit.",
    rules: [
      "Buy an ATM call, sell an OTM call of the same expiry.",
      "Max loss = net debit paid.",
      "Max profit = strike width − debit.",
      "Exit at 50–70% of max profit or on trend break.",
    ],
  },
  {
    id: "st5",
    name: "Iron Condor",
    timeframe: "Options · Weekly",
    type: "Options",
    difficulty: "Advanced",
    summary: "Range-bound, theta-positive strategy for low-volatility weeks.",
    rules: [
      "Sell an OTM call spread and an OTM put spread.",
      "Choose strikes outside the expected move.",
      "Collect premium; profit if price stays inside the wings.",
      "Manage at 50% profit or if a short strike is breached.",
    ],
  },
  {
    id: "st6",
    name: "Gap & Go",
    timeframe: "Intraday · 1m",
    type: "Momentum",
    difficulty: "Advanced",
    summary: "Ride high-volume morning gaps in the direction of the gap.",
    rules: [
      "Scan for stocks gapping 3%+ on news with volume.",
      "Enter on the break of the first 1-min candle high.",
      "Stop under the first candle low.",
      "Scale out into strength; never hold the full position.",
    ],
  },
  {
    id: "st7",
    name: "Support/Resistance Bounce",
    timeframe: "Swing · 1H",
    type: "Range",
    difficulty: "Beginner",
    summary: "Buy at well-tested support, sell at resistance in a range.",
    rules: [
      "Identify a clear range with 2+ touches each side.",
      "Enter on a rejection wick at the level.",
      "Stop just beyond the level.",
      "Target the opposite boundary of the range.",
    ],
  },
  {
    id: "st8",
    name: "Breakout Retest",
    timeframe: "Swing · Daily",
    type: "Breakout",
    difficulty: "Intermediate",
    summary: "Enter on the retest of a broken level rather than the break itself.",
    rules: [
      "Wait for a decisive close beyond a key level.",
      "Let price pull back to retest the broken level.",
      "Enter on confirmation that the level now holds.",
      "Stop below the retest low; measure the target from the base.",
    ],
  },
];

/* ---------- Glossary ---------- */

export const glossary = [
  { term: "VWAP", definition: "Volume-Weighted Average Price — the average price weighted by volume, used as an intraday fair-value benchmark." },
  { term: "Open Interest", definition: "The total number of outstanding derivative contracts that have not been settled." },
  { term: "Stop-Loss", definition: "A predetermined exit price that caps the loss on a trade." },
  { term: "Risk:Reward", definition: "The ratio of money risked to potential profit on a trade." },
  { term: "Intraday", definition: "Trades opened and closed within the same trading session." },
  { term: "Swing Trade", definition: "A position held for several days to weeks to capture a larger move." },
  { term: "Breakout", definition: "Price moving decisively beyond a defined support or resistance level." },
  { term: "Theta", definition: "The rate at which an option loses value as time passes (time decay)." },
  { term: "Implied Volatility", definition: "The market's forecast of likely movement in a security's price, derived from option prices." },
  { term: "Max Pain", definition: "The strike price at which the largest number of options expire worthless." },
  { term: "Margin", definition: "The capital a broker requires you to deposit to hold a leveraged position." },
  { term: "Circuit Limit", definition: "Exchange-imposed price band beyond which a stock cannot trade for the session." },
  { term: "FII / DII", definition: "Foreign and Domestic Institutional Investors — large players whose flows move markets." },
  { term: "Gap Up / Down", definition: "When a stock opens significantly higher or lower than its previous close." },
  { term: "Trailing Stop", definition: "A stop-loss that moves with price to lock in profits as the trade runs." },
];

/* ---------- Courses ---------- */

export const courses = [
  { id: "co1", title: "Market Foundations", level: "Beginner", lessons: 12, duration: "3h 20m", description: "How the NSE & BSE work, order types, and reading a price chart from scratch." },
  { id: "co2", title: "Candlestick Mastery", level: "Beginner", lessons: 18, duration: "4h 10m", description: "Every major candlestick pattern and how to trade it with confirmation." },
  { id: "co3", title: "Intraday Playbook", level: "Intermediate", lessons: 15, duration: "5h 05m", description: "Opening range, VWAP, and momentum strategies for the active day trader." },
  { id: "co4", title: "Options Decoded", level: "Intermediate", lessons: 20, duration: "6h 30m", description: "Greeks, spreads, and income strategies explained for Indian weekly options." },
  { id: "co5", title: "Risk & Psychology", level: "Advanced", lessons: 10, duration: "2h 45m", description: "Position sizing, drawdown control, and the mindset of consistent traders." },
  { id: "co6", title: "Swing Trading Systems", level: "Advanced", lessons: 14, duration: "4h 50m", description: "Building and back-testing repeatable multi-day swing strategies." },
];

/* ---------- News & updates ---------- */

export const newsItems = [
  { id: "n1", date: "Jun 18, 2026", tag: "Product", title: "Options Payoff calculator now live", body: "Model multi-leg strategies with an interactive payoff chart right inside the Tools page." },
  { id: "n2", date: "Jun 02, 2026", tag: "Milestone", title: "2,300 traders and counting", body: "Our verified Telegram community crossed 2,300 active members this month. Thank you." },
  { id: "n3", date: "May 21, 2026", tag: "Education", title: "New course: Options Decoded", body: "A 20-lesson deep dive into the Greeks and weekly-options income strategies." },
  { id: "n4", date: "May 04, 2026", tag: "Transparency", title: "Q1 FY26 track record published", body: "Our full ledger of calls — wins and losses — for the quarter is now on the dashboard." },
];

/* ---------- Team ---------- */

export const team = [
  { name: "Vikram Sethi", role: "Founder & Head Analyst", bio: "12+ years trading Indian equities and derivatives. Built HeyFund to bring discipline to retail trading.", initials: "VS" },
  { name: "Ananya Rao", role: "Options Strategist", bio: "Specialises in weekly options structures and volatility-based setups.", initials: "AR" },
  { name: "Karthik Iyer", role: "Markets Educator", bio: "Leads the Learn hub and turns complex concepts into plain-English lessons.", initials: "KI" },
  { name: "Sneha Kapoor", role: "Risk & Research", bio: "Owns the track-record ledger and the risk frameworks behind every call.", initials: "SK" },
];

/* ---------- Markets page ---------- */

export const marketSentiment = {
  value: 64, // 0-100, >50 bullish
  label: "Greed",
  description:
    "Breadth is positive and FIIs were net buyers; momentum favours the bulls but watch for profit-taking near resistance.",
};

export const sectorHeat = [
  { sector: "IT", changePercent: 1.42 },
  { sector: "Banks", changePercent: -0.38 },
  { sector: "Auto", changePercent: 1.95 },
  { sector: "Pharma", changePercent: 0.62 },
  { sector: "FMCG", changePercent: -0.21 },
  { sector: "Metals", changePercent: 2.31 },
  { sector: "Energy", changePercent: 0.88 },
  { sector: "Realty", changePercent: -1.12 },
  { sector: "Financials", changePercent: 0.28 },
  { sector: "Media", changePercent: -0.74 },
  { sector: "PSU Banks", changePercent: 1.18 },
  { sector: "Infra", changePercent: 0.51 },
];

export const openInterest = [
  { strike: 23800, callOI: 12.4, putOI: 38.2, callChange: -8.1, putChange: 22.4 },
  { strike: 24000, callOI: 18.9, putOI: 45.6, callChange: -4.2, putChange: 31.7 },
  { strike: 24100, callOI: 24.3, putOI: 33.1, callChange: 2.6, putChange: 12.9 },
  { strike: 24200, callOI: 41.8, putOI: 28.4, callChange: 9.4, putChange: 6.1 },
  { strike: 24300, callOI: 52.6, putOI: 19.7, callChange: 14.8, putChange: -3.4 },
  { strike: 24400, callOI: 47.1, putOI: 12.3, callChange: 11.2, putChange: -7.8 },
  { strike: 24500, callOI: 58.9, putOI: 8.6, callChange: 18.5, putChange: -11.2 },
];

/* ---------- Dashboard ---------- */

export const pnlSeries = [
  { date: "May 26", pnl: 0 },
  { date: "May 28", pnl: 4200 },
  { date: "May 30", pnl: 3100 },
  { date: "Jun 02", pnl: 7600 },
  { date: "Jun 04", pnl: 9800 },
  { date: "Jun 06", pnl: 8200 },
  { date: "Jun 09", pnl: 13400 },
  { date: "Jun 11", pnl: 16900 },
  { date: "Jun 13", pnl: 15200 },
  { date: "Jun 16", pnl: 21800 },
  { date: "Jun 18", pnl: 24600 },
  { date: "Jun 20", pnl: 28900 },
];

export const dashboardStats = [
  { label: "Net P&L", value: "+₹28,900", positive: true, sub: "this month" },
  { label: "Win rate", value: "72%", positive: true, sub: "47 of 65 calls" },
  { label: "Avg R:R", value: "1 : 1.9", positive: true, sub: "realised" },
  { label: "Max drawdown", value: "-₹4,300", positive: false, sub: "peak-to-trough" },
];

export const recentActivity = [
  { id: "a1", symbol: "RELIANCE", direction: "LONG", result: "win", pnl: 2150, time: "Today · 13:42" },
  { id: "a2", symbol: "NIFTY 24200 PE", direction: "SHORT", result: "win", pnl: 3200, time: "Today · 11:18" },
  { id: "a3", symbol: "TATAMOTORS", direction: "SHORT", result: "loss", pnl: -1400, time: "Today · 10:21" },
  { id: "a4", symbol: "BANKNIFTY 52000 CE", direction: "LONG", result: "win", pnl: 4800, time: "Yest · 14:55" },
  { id: "a5", symbol: "HDFCBANK", direction: "SHORT", result: "win", pnl: 1600, time: "Yest · 12:30" },
  { id: "a6", symbol: "INFY", direction: "LONG", result: "loss", pnl: -900, time: "Yest · 09:58" },
];

/* ---------- Telegram chat (home section) ---------- */

export const telegramMessages = [
  { id: "tg1", time: "09:15", text: "📊 Pre-market brief: Nifty likely to open flat. Watch 24,150 support and 24,320 resistance. Bank Nifty in focus today." },
  { id: "tg2", time: "09:42", text: "🟢 LONG RELIANCE @ 2942\nTarget 2985 · SL 2918\nIntraday · risk 1% max" },
  { id: "tg3", time: "11:04", text: "✅ NIFTY 24200 PE booked at 64 from 96 — target hit. Well done, keep risk tight on the next one." },
];

export const telegramFeatures = [
  "Instant push notifications",
  "Verified, official channel",
  "Daily pre-market briefs",
  "2,300+ traders inside",
];
