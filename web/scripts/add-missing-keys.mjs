import fs from 'node:fs/promises'
import path from 'node:path'

const LOCALES_DIR = path.resolve('src/i18n/locales')

function stableStringify(obj) {
  return JSON.stringify(obj, null, 2) + '\n'
}

const newKeys = {
  en: {
    'Production-Grade AI Gateway Infrastructure':
      'Production-Grade AI Gateway Infrastructure',
    'One Unified Gateway for': 'One Unified Gateway for',
    'Every Leading AI Model': 'Every Leading AI Model',
    'Aggregate 40+ top AI providers with automated failover, sub-10ms routing, and 6-decimal cost transparency. Built for production-scale reliability.':
      'Aggregate 40+ top AI providers with automated failover, sub-10ms routing, and 6-decimal cost transparency. Built for production-scale reliability.',
    'Get Started Free': 'Get Started Free',
    'Explore Models & Pricing': 'Explore Models & Pricing',
    'Client Ecosystem': 'Client Ecosystem',
    'Zero Code Changes': 'Zero Code Changes',
    'Direct drop-in compatibility with Cursor, Claude Code, Cherry Studio, and standard SDKs.':
      'Direct drop-in compatibility with Cursor, Claude Code, Cherry Studio, and standard SDKs.',
    '40+ Native Upstream Engines & Inference Clusters':
      '40+ Native Upstream Engines & Inference Clusters',
    'ACTIVE · HIGH AVAILABILITY': 'ACTIVE · HIGH AVAILABILITY',
    'CIRCUIT TRIP · FAILOVER ACTIVE': 'CIRCUIT TRIP · FAILOVER ACTIVE',
    'Click to test instant automated channel failover and zero client drop.':
      'Click to test instant automated channel failover and zero client drop.',
    'Curated Model Matrix': 'Curated Model Matrix',
    'Real-Time Pricing & Performance at a Glance':
      'Real-Time Pricing & Performance at a Glance',
    'View All 100+ Models & Pricing': 'View All 100+ Models & Pricing',
    'Upstream Services Integrated': 'Upstream Services Integrated',
    'Model Billing Coverage': 'Model Billing Coverage',
    'Standardized API Endpoints': 'Standardized API Endpoints',
    'Scheduling & QoS Controls': 'Scheduling & QoS Controls',
    'Enterprise Gateway Architecture': 'Enterprise Gateway Architecture',
    'Production-Grade Infrastructure,': 'Production-Grade Infrastructure,',
    'Engineered for Resilient AI Workloads':
      'Engineered for Resilient AI Workloads',
    'Intelligent Circuit Breaker & Failover':
      'Intelligent Circuit Breaker & Failover',
    'Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers.':
      'Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers.',
    'Transparent FinOps Cost Engine': 'Transparent FinOps Cost Engine',
    '6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers.':
      '6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers.',
    'Global Low-Latency Edge Routing': 'Global Low-Latency Edge Routing',
    'Multi-region edge proxy with intelligent regional routing for ultra-low latency inference.':
      'Multi-region edge proxy with intelligent regional routing for ultra-low latency inference.',
    'Zero-Friction Protocol Converter': 'Zero-Friction Protocol Converter',
    'Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly.':
      'Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly.',
    'Zero Friction Integration': 'Zero Friction Integration',
    'Get Started in Seconds': 'Get Started in Seconds',
    'Ready to build resilient,': 'Ready to build resilient,',
    'production-grade AI applications?': 'production-grade AI applications?',
    'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.':
      'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.',
  },
  zh: {
    'Production-Grade AI Gateway Infrastructure': '生产级 AI 网关基础设施',
    'One Unified Gateway for': '统一 API 网关，',
    'Every Leading AI Model': '连接全球顶级大模型能力',
    'Aggregate 40+ top AI providers with automated failover, sub-10ms routing, and 6-decimal cost transparency. Built for production-scale reliability.':
      '一行代码聚合 40+ 顶级 AI 模型服务商。具备毫秒级智能熔断、多渠道负载均衡与高精度缓存降本，专为生产级高可用场景打造。',
    'Get Started Free': '立即免费体验',
    'Explore Models & Pricing': '探索模型与定价',
    'Client Ecosystem': '开放生态兼容',
    'Zero Code Changes': '零代码改造',
    'Direct drop-in compatibility with Cursor, Claude Code, Cherry Studio, and standard SDKs.':
      '开箱即用兼容 Cursor、Claude Code、Cherry Studio 及官方标准 SDK。',
    '40+ Native Upstream Engines & Inference Clusters':
      '40+ 原生上游引擎与推理集群',
    'ACTIVE · HIGH AVAILABILITY': '集群健康 · 毫秒就近调度',
    'CIRCUIT TRIP · FAILOVER ACTIVE': '自动熔断 · 备用节点接管',
    'Click to test instant automated channel failover and zero client drop.':
      '点击测试真实上游故障时的秒级自愈与零中断转移。',
    'Curated Model Matrix': '热门模型全景探索',
    'Real-Time Pricing & Performance at a Glance':
      '主流推理引擎与实时成本一目了然',
    'View All 100+ Models & Pricing': '查看全部 100+ 模型与实时单价',
    'Upstream Services Integrated': '集成上游服务商',
    'Model Billing Coverage': '模型计费覆盖',
    'Standardized API Endpoints': '标准化 API 端点',
    'Scheduling & QoS Controls': '流量调度与 QoS 策略',
    'Enterprise Gateway Architecture': '企业级网关核心架构',
    'Production-Grade Infrastructure,': '专为生产级高并发打造的',
    'Engineered for Resilient AI Workloads': '高性能高可用 AI 基础设施',
    'Intelligent Circuit Breaker & Failover':
      '毫秒级智能熔断与自动故障降级',
    'Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers.':
      '全自动健康探针与渠道权重分配，当主渠道触发限流或超时瞬间，毫秒级无感切换至备用渠道，确保客户端连接零中断。',
    'Transparent FinOps Cost Engine': '透明可解释 FinOps 计费引擎',
    '6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers.':
      '精确至小数点后 6 位，自动计算 Prompt Cache 缓存命中折扣（最高节省 90%），计费公式完全公开透明，拒绝黑盒扣费。',
    'Global Low-Latency Edge Routing': '全球多地域就近低延迟路由',
    'Multi-region edge proxy with intelligent regional routing for ultra-low latency inference.':
      '覆盖美东、法兰克福、东京等多地边缘节点，智能就近调度全球流量，大幅降低跨境 API 传输延迟。',
    'Zero-Friction Protocol Converter': '全协议零摩擦无损转译引擎',
    'Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly.':
      '客户端只需对接标准的 OpenAI API 格式，网关底层全自动转译为 Anthropic、Gemini 或 Bedrock 原生协议，抹平流式 SSE 与工具调用差异。',
    'Zero Friction Integration': '全生态极速对接',
    'Get Started in Seconds': '极速部署与接入',
    'Ready to build resilient,': '准备好构建生产级',
    'production-grade AI applications?': '高可用 AI 系统了吗？',
    'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.':
      '立即接入高可用企业级网关，畅享多上游自动容灾、透明成本结算与极速流式推理体验。',
  },
  'zh-TW': {
    'Production-Grade AI Gateway Infrastructure': '生產級 AI 網關基礎設施',
    'One Unified Gateway for': '統一 API 網關，',
    'Every Leading AI Model': '連接全球頂級大模型能力',
    'Aggregate 40+ top AI providers with automated failover, sub-10ms routing, and 6-decimal cost transparency. Built for production-scale reliability.':
      '一行程式碼聚合 40+ 頂級 AI 模型服務商。具備毫秒級智能熔斷、多渠道負載均衡與高精度快取降本，專為生產級高可用場景打造。',
    'Get Started Free': '立即免費體驗',
    'Explore Models & Pricing': '探索模型與定價',
    'Client Ecosystem': '開放生態相容',
    'Zero Code Changes': '零程式碼改造',
    'Direct drop-in compatibility with Cursor, Claude Code, Cherry Studio, and standard SDKs.':
      '開箱即用相容 Cursor、Claude Code、Cherry Studio 及官方標準 SDK。',
    '40+ Native Upstream Engines & Inference Clusters':
      '40+ 原生上游引擎與推理集群',
    'ACTIVE · HIGH AVAILABILITY': '集群健康 · 毫秒就近調度',
    'CIRCUIT TRIP · FAILOVER ACTIVE': '自動熔斷 · 備用節點接管',
    'Click to test instant automated channel failover and zero client drop.':
      '點擊測試真實上游故障時的秒級自癒與零中斷轉移。',
    'Curated Model Matrix': '熱門模型全景探索',
    'Real-Time Pricing & Performance at a Glance':
      '主流推理引擎與即時成本一目了然',
    'View All 100+ Models & Pricing': '查看全部 100+ 模型與即時單價',
    'Upstream Services Integrated': '集成上游服務商',
    'Model Billing Coverage': '模型計費覆蓋',
    'Standardized API Endpoints': '標準化 API 端點',
    'Scheduling & QoS Controls': '流量調度與 QoS 策略',
    'Enterprise Gateway Architecture': '企業級網關核心架構',
    'Production-Grade Infrastructure,': '專為生產級高並發打造的',
    'Engineered for Resilient AI Workloads': '高性能高可用 AI 基礎設施',
    'Intelligent Circuit Breaker & Failover':
      '毫秒級智能熔斷與自動故障降級',
    'Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers.':
      '全自動健康探針與渠道權重分配，當主渠道觸發限流或超時瞬間，毫秒級無感切換至備用渠道，確保客戶端連接零中斷。',
    'Transparent FinOps Cost Engine': '透明可解釋 FinOps 計費引擎',
    '6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers.':
      '精確至小數點後 6 位，自動計算 Prompt Cache 快取命中折扣（最高節省 90%），計費公式完全公開透明，拒絕黑盒扣費。',
    'Global Low-Latency Edge Routing': '全球多地域就近低延遲路由',
    'Multi-region edge proxy with intelligent regional routing for ultra-low latency inference.':
      '覆蓋美東、法蘭克福、東京等多地邊緣節點，智能就近調度全球流量，大幅降低跨境 API 傳輸延遲。',
    'Zero-Friction Protocol Converter': '全協議零摩擦無損轉譯引擎',
    'Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly.':
      '客戶端只需對接標準的 OpenAI API 格式，網關底層全自動轉譯為 Anthropic、Gemini 或 Bedrock 原生協議，抹平流式 SSE 與工具調用差異。',
    'Zero Friction Integration': '全生態極速對接',
    'Get Started in Seconds': '極速部署與接入',
    'Ready to build resilient,': '準備好構建生產級',
    'production-grade AI applications?': '高可用 AI 系統了嗎？',
    'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.':
      '立即接入高可用企業級網關，暢享多上游自動容災、透明成本結算與極速流式推理體驗。',
  },
  fr: {
    'Production-Grade AI Gateway Infrastructure':
      'Infrastructure de passerelle IA de niveau production',
    'One Unified Gateway for': 'Une passerelle unifiée pour',
    'Every Leading AI Model': "Tous les principaux modèles d'IA",
    'Aggregate 40+ top AI providers with automated failover, sub-10ms routing, and 6-decimal cost transparency. Built for production-scale reliability.':
      "Agrégez plus de 40 fournisseurs d'IA avec basculement automatique, routage en moins de 10 ms et transparence des coûts à 6 décimales. Conçu pour la fiabilité en production.",
    'Get Started Free': 'Commencer gratuitement',
    'Explore Models & Pricing': 'Explorer les modèles et tarifs',
    'Client Ecosystem': 'Écosystème client',
    'Zero Code Changes': 'Aucun changement de code',
    'Direct drop-in compatibility with Cursor, Claude Code, Cherry Studio, and standard SDKs.':
      'Compatibilité directe avec Cursor, Claude Code, Cherry Studio et les SDK standards.',
    '40+ Native Upstream Engines & Inference Clusters':
      "40+ moteurs natifs en amont et clusters d'inférence",
    'ACTIVE · HIGH AVAILABILITY': 'ACTIF · HAUTE DISPONIBILITÉ',
    'CIRCUIT TRIP · FAILOVER ACTIVE':
      'DISJONCTEUR DÉCLENCHÉ · BASCULEMENT ACTIF',
    'Click to test instant automated channel failover and zero client drop.':
      'Cliquez pour tester le basculement automatique instantané sans interruption client.',
    'Curated Model Matrix': 'Matrice de modèles sélectionnés',
    'Real-Time Pricing & Performance at a Glance':
      'Tarification et performances en temps réel en un coup d’œil',
    'View All 100+ Models & Pricing': 'Voir les 100+ modèles et tarifs',
    'Upstream Services Integrated': 'Fournisseurs en amont intégrés',
    'Model Billing Coverage': 'Couverture de facturation des modèles',
    'Standardized API Endpoints': "Points de terminaison d'API standardisés",
    'Scheduling & QoS Controls': 'Contrôles de planification et QoS',
    'Enterprise Gateway Architecture':
      "Architecture de passerelle d'entreprise",
    'Production-Grade Infrastructure,':
      'Infrastructure de niveau production,',
    'Engineered for Resilient AI Workloads':
      "Conçue pour les charges de travail d'IA résilientes",
    'Intelligent Circuit Breaker & Failover':
      'Disjoncteur intelligent et basculement',
    'Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers.':
      "Surveillance automatisée de l'état, équilibrage de charge pondéré et basculement sans interruption sur plus de 40 fournisseurs.",
    'Transparent FinOps Cost Engine': 'Moteur de coûts FinOps transparent',
    '6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers.':
      "Transparence des coûts jusqu'à 6 décimales avec remises de cache (jusqu'à 90 % d'économie) et multiplicateurs de modèles.",
    'Global Low-Latency Edge Routing':
      'Routage de périphérie mondial à faible latence',
    'Multi-region edge proxy with intelligent regional routing for ultra-low latency inference.':
      'Proxy de périphérie multi-régions avec routage régional intelligent pour une inférence à très faible latence.',
    'Zero-Friction Protocol Converter':
      'Convertisseur de protocole sans friction',
    'Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly.':
      'Traduisez à la volée le format OpenAI standard en requêtes natives Anthropic Messages, Google Vertex ou Bedrock.',
    'Zero Friction Integration': 'Intégration sans friction',
    'Get Started in Seconds': 'Commencez en quelques secondes',
    'Ready to build resilient,': 'Prêt à créer des applications IA',
    'production-grade AI applications?':
      'résilientes et prêtes pour la production ?',
    'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.':
      "Déployez votre propre passerelle d'entreprise ou connectez-vous immédiatement pour acheminer vos requêtes avec basculement automatique et facturation transparente.",
  },
  ja: {
    'Production-Grade AI Gateway Infrastructure':
      '本番環境向けAIゲートウェイインフラ',
    'One Unified Gateway for': '統合された単一のゲートウェイ',
    'Every Leading AI Model': 'すべての主要なAIモデルに接続',
    'Aggregate 40+ top AI providers with automated failover, sub-10ms routing, and 6-decimal cost transparency. Built for production-scale reliability.':
      '自動フェイルオーバー、10ms未満のルーティング、6桁のコスト透明性を備えた40以上の主要AIプロバイダーを統合。本番環境の信頼性のために構築されています。',
    'Get Started Free': '無料で始める',
    'Explore Models & Pricing': 'モデルと価格を見る',
    'Client Ecosystem': 'クライアントエコシステム',
    'Zero Code Changes': 'コード変更ゼロ',
    'Direct drop-in compatibility with Cursor, Claude Code, Cherry Studio, and standard SDKs.':
      'Cursor、Claude Code、Cherry Studio、標準SDKと直接互換性があります。',
    '40+ Native Upstream Engines & Inference Clusters':
      '40以上のネイティブアップストリームエンジンと推論クラスター',
    'ACTIVE · HIGH AVAILABILITY': 'アクティブ · 高可用性',
    'CIRCUIT TRIP · FAILOVER ACTIVE': 'サーキットトリップ · フェイルオーバー作動',
    'Click to test instant automated channel failover and zero client drop.':
      'クリックして即時自動フェイルオーバーとクライアント切断ゼロをテストします。',
    'Curated Model Matrix': '厳選されたモデルマトリックス',
    'Real-Time Pricing & Performance at a Glance':
      'リアルタイムの価格とパフォーマンスが一目でわかります',
    'View All 100+ Models & Pricing':
      'すべての100以上のモデルと価格を見る',
    'Upstream Services Integrated': '統合されたアップストリームサービス',
    'Model Billing Coverage': 'モデル課金カバレッジ',
    'Standardized API Endpoints': '標準化されたAPIエンドポイント',
    'Scheduling & QoS Controls': 'スケジューリングとQoS制御',
    'Enterprise Gateway Architecture':
      'エンタープライズゲートウェイアーキテクチャ',
    'Production-Grade Infrastructure,':
      '本番稼働クラスのインフラストラクチャ、',
    'Engineered for Resilient AI Workloads':
      '高耐久なAIワークロードのための設計',
    'Intelligent Circuit Breaker & Failover':
      'インテリジェントサーキットブレーカーとフェイルオーバー',
    'Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers.':
      '自動ヘルスチェック、チャネルの重み付けバランシング、40以上のプロバイダー間でのダウンタイムゼロのフェイルオーバー。',
    'Transparent FinOps Cost Engine': '透明性の高いFinOpsコストエンジン',
    '6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers.':
      '小数点以下6桁のコスト透明性、プロンプトキャッシュ割引（最大90％削減）、モデル倍率計算に対応。',
    'Global Low-Latency Edge Routing':
      'グローバル低遅延エッジルーティング',
    'Multi-region edge proxy with intelligent regional routing for ultra-low latency inference.':
      '超低遅延推論のためのインテリジェントなリージョンルーティングを備えたマルチリージョンエッジプロキシ。',
    'Zero-Friction Protocol Converter':
      'フリクションレスプロトコルコンバーター',
    'Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly.':
      '標準のOpenAI形式をAnthropic Messages、Google Vertex、またはBedrock形式にリアルタイムで自動変換します。',
    'Zero Friction Integration': 'フリクションレス統合',
    'Get Started in Seconds': '数秒で開始',
    'Ready to build resilient,': '高耐久なAIアプリケーションを',
    'production-grade AI applications?':
      '本番環境向けに構築する準備はできましたか？',
    'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.':
      'エンタープライズゲートウェイを自前でデプロイするか、今すぐ接続して自動フェイルオーバーと透明な課金でリクエストのルーティングを開始しましょう。',
  },
  ru: {
    'Production-Grade AI Gateway Infrastructure':
      'Инфраструктура ИИ-шлюза производственного уровня',
    'One Unified Gateway for': 'Единый шлюз для',
    'Every Leading AI Model': 'Всех ведущих моделей ИИ',
    'Aggregate 40+ top AI providers with automated failover, sub-10ms routing, and 6-decimal cost transparency. Built for production-scale reliability.':
      'Объедините 40+ ведущих провайдеров ИИ с автоматическим переключением, маршрутизацией менее 10 мс и прозрачностью затрат до 6 знаков. Создан для надежности в продакшене.',
    'Get Started Free': 'Начать бесплатно',
    'Explore Models & Pricing': 'Обзор моделей и цен',
    'Client Ecosystem': 'Экосистема клиентов',
    'Zero Code Changes': 'Без изменения кода',
    'Direct drop-in compatibility with Cursor, Claude Code, Cherry Studio, and standard SDKs.':
      'Прямая совместимость с Cursor, Claude Code, Cherry Studio и стандартными SDK.',
    '40+ Native Upstream Engines & Inference Clusters':
      '40+ нативных движков и кластеров инференса',
    'ACTIVE · HIGH AVAILABILITY': 'АКТИВНО · ВЫСОКАЯ ДОСТУПНОСТЬ',
    'CIRCUIT TRIP · FAILOVER ACTIVE': 'СБОЙ ЦЕПИ · ПЕРЕКЛЮЧЕНИЕ АКТИВНО',
    'Click to test instant automated channel failover and zero client drop.':
      'Нажмите для проверки мгновенного переключения каналов без потери соединения.',
    'Curated Model Matrix': 'Матрица избранных моделей',
    'Real-Time Pricing & Performance at a Glance':
      'Цены и производительность в реальном времени с первого взгляда',
    'View All 100+ Models & Pricing': 'Посмотреть все 100+ моделей и цены',
    'Upstream Services Integrated': 'Интегрированных провайдеров',
    'Model Billing Coverage': 'Покрытие тарификации моделей',
    'Standardized API Endpoints': 'Стандартизированные эндпоинты API',
    'Scheduling & QoS Controls': 'Управление маршрутизацией и QoS',
    'Enterprise Gateway Architecture':
      'Архитектура корпоративного шлюза',
    'Production-Grade Infrastructure,':
      'Инфраструктура производственного уровня,',
    'Engineered for Resilient AI Workloads':
      'Созданная для отказоустойчивых нагрузок ИИ',
    'Intelligent Circuit Breaker & Failover':
      'Умный предохранитель и переключение',
    'Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers.':
      'Автоматический мониторинг состояния, балансировка весов каналов и переключение без простоев между 40+ провайдерами.',
    'Transparent FinOps Cost Engine': 'Прозрачный движок затрат FinOps',
    '6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers.':
      'Прозрачность затрат до 6 знаков с учетом скидок на кэш промптов (до 90% экономии) и коэффициентов моделей.',
    'Global Low-Latency Edge Routing':
      'Глобальная пограничная маршрутизация с низкой задержкой',
    'Multi-region edge proxy with intelligent regional routing for ultra-low latency inference.':
      'Мультирегиональный прокси с интеллектуальной маршрутизацией для инференса со сверхнизкой задержкой.',
    'Zero-Friction Protocol Converter':
      'Бесшовный преобразователь протоколов',
    'Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly.':
      'Мгновенный перевод стандартного формата OpenAI в нативные запросы Anthropic Messages, Google Vertex или Bedrock.',
    'Zero Friction Integration': 'Бесшовная интеграция',
    'Get Started in Seconds': 'Начните за секунды',
    'Ready to build resilient,': 'Готовы создавать надежные',
    'production-grade AI applications?': 'производственного уровня?',
    'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.':
      'Разверните собственный корпоративный шлюз или подключитесь прямо сейчас для маршрутизации запросов с автоматическим переключением и прозрачными тарифами.',
  },
  vi: {
    'Production-Grade AI Gateway Infrastructure':
      'Hạ tầng cổng AI cấp độ sản xuất',
    'One Unified Gateway for': 'Một cổng hợp nhất cho',
    'Every Leading AI Model': 'Mọi mô hình AI hàng đầu',
    'Aggregate 40+ top AI providers with automated failover, sub-10ms routing, and 6-decimal cost transparency. Built for production-scale reliability.':
      'Tổng hợp 40+ nhà cung cấp AI hàng đầu với tính năng chuyển đổi dự phòng tự động, định tuyến dưới 10ms và tính minh bạch chi phí đến 6 chữ số thập phân.',
    'Get Started Free': 'Bắt đầu miễn phí',
    'Explore Models & Pricing': 'Khám phá mô hình & giá cả',
    'Client Ecosystem': 'Hệ sinh thái máy khách',
    'Zero Code Changes': 'Không cần sửa mã',
    'Direct drop-in compatibility with Cursor, Claude Code, Cherry Studio, and standard SDKs.':
      'Tương thích trực tiếp với Cursor, Claude Code, Cherry Studio và các SDK tiêu chuẩn.',
    '40+ Native Upstream Engines & Inference Clusters':
      '40+ công cụ nguồn gốc & cụm suy luận',
    'ACTIVE · HIGH AVAILABILITY': 'HOẠT ĐỘNG · TÍNH SẴN SÀNG CAO',
    'CIRCUIT TRIP · FAILOVER ACTIVE': 'NGẮT MẠCH · DỰ PHÒNG HOẠT ĐỘNG',
    'Click to test instant automated channel failover and zero client drop.':
      'Nhấp để kiểm tra chuyển đổi kênh tự động tức thì không gián đoạn.',
    'Curated Model Matrix': 'Ma trận mô hình tuyển chọn',
    'Real-Time Pricing & Performance at a Glance':
      'Bảng giá và hiệu suất thời gian thực trong tầm mắt',
    'View All 100+ Models & Pricing': 'Xem tất cả 100+ mô hình & giá cả',
    'Upstream Services Integrated': 'Dịch vụ nguồn được tích hợp',
    'Model Billing Coverage': 'Mô hình được hỗ trợ thanh toán',
    'Standardized API Endpoints': 'Điểm cuối API tiêu chuẩn',
    'Scheduling & QoS Controls': 'Kiểm soát lập lịch & QoS',
    'Enterprise Gateway Architecture': 'Kiến trúc cổng doanh nghiệp',
    'Production-Grade Infrastructure,': 'Hạ tầng cấp độ sản xuất,',
    'Engineered for Resilient AI Workloads':
      'Được thiết kế cho khối lượng công việc AI linh hoạt',
    'Intelligent Circuit Breaker & Failover':
      'Bộ ngắt mạch thông minh & chuyển đổi dự phòng',
    'Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers.':
      'Tự động theo dõi tình trạng, cân bằng tải theo trọng số và chuyển đổi dự phòng không gián đoạn trên hơn 40 nhà cung cấp.',
    'Transparent FinOps Cost Engine': 'Động cơ chi phí FinOps minh bạch',
    '6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers.':
      'Minh bạch chi phí đến 6 chữ số thập phân với chiết khấu bộ nhớ đệm (tiết kiệm đến 90%) và hệ số nhân mô hình.',
    'Global Low-Latency Edge Routing':
      'Định tuyến biên độ trễ thấp toàn cầu',
    'Multi-region edge proxy with intelligent regional routing for ultra-low latency inference.':
      'Proxy biên đa vùng với định tuyến khu vực thông minh giúp suy luận độ trễ cực thấp.',
    'Zero-Friction Protocol Converter':
      'Bộ chuyển đổi giao thức không ma sát',
    'Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly.':
      'Tự động dịch định dạng chuẩn OpenAI sang Anthropic Messages, Google Vertex hoặc Bedrock ngay tức thì.',
    'Zero Friction Integration': 'Tích hợp không ma sát',
    'Get Started in Seconds': 'Bắt đầu sau vài giây',
    'Ready to build resilient,': 'Sẵn sàng xây dựng ứng dụng AI',
    'production-grade AI applications?':
      'cấp độ sản xuất và linh hoạt?',
    'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.':
      'Triển khai cổng doanh nghiệp của riêng bạn hoặc kết nối ngay lập tức để định tuyến yêu cầu với tính năng dự phòng tự động và thanh toán minh bạch.',
  },
}

async function main() {
  let totalAdded = 0

  for (const [locale, trans] of Object.entries(newKeys)) {
    const filePath = path.join(LOCALES_DIR, `${locale}.json`)
    const json = JSON.parse(await fs.readFile(filePath, 'utf8'))

    let count = 0
    for (const [key, value] of Object.entries(trans)) {
      if (!Object.prototype.hasOwnProperty.call(json.translation, key)) {
        json.translation[key] = value
        count++
      } else if (json.translation[key] !== value) {
        json.translation[key] = value
        count++
      }
    }

    if (count > 0) {
      json.translation = Object.fromEntries(
        Object.entries(json.translation).sort(([a], [b]) => a.localeCompare(b))
      )
      await fs.writeFile(filePath, stableStringify(json), 'utf8')
      console.log(`[${locale}] added/updated ${count} keys`)
      totalAdded += count
    } else {
      console.log(`[${locale}] up to date`)
    }
  }

  console.log(`Done! Total added/updated across all locales: ${totalAdded}`)
}

main().catch(console.error)
