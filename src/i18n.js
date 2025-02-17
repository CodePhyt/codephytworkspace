import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero: {
        greeting: "Hi, I'm Kadir",
        roles: {
          architect: "AI Solutions Architect",
          integrator: "AI Systems Integrator",
          technologist: "Creative Technologist"
        },
        description: "Crafting intelligent solutions at the intersection of AI and human creativity",
        bookMeeting: "Book a Meeting"
      },
      nav: {
        language: "Change Language"
      },
      sections: {
        skills: "Skills & Expertise",
        tools: "Tools & Technologies",
        services: "AI Services & Solutions",
        contact: "Let's Connect"
      },
      skills: {
        title: "Skills & Expertise",
        categories: {
          ai: "AI & Machine Learning",
          frontend: "Frontend Development",
          backend: "Backend Development",
          devops: "DevOps & Cloud",
          creative: "Creative Technologies"
        }
      },
      tools: {
        title: "Tools & Technologies",
        augmentCode: {
          name: "AugmentCode",
          description: "AI-powered code enhancement and optimization"
        },
        copyCoder: {
          name: "CopyCoder",
          description: "Intelligent code replication and adaptation"
        },
        omniParser: {
          name: "OmniParser",
          description: "Universal data parsing and transformation"
        },
        dataButton: {
          name: "DataButton",
          description: "One-click data processing solutions"
        },
        rooCode: {
          name: "RooCode",
          description: "Advanced code generation and analysis"
        },
        uiTars: {
          name: "UITars",
          description: "AI-driven UI component creation"
        },
        codeium: {
          name: "Codeium",
          description: "Intelligent code completion and suggestions"
        },
        flutterFlow: {
          name: "FlutterFlow",
          description: "Visual app development with Flutter"
        },
        huggingFace: {
          name: "Hugging Face",
          description: "State-of-the-art NLP models and tools"
        },
        crewAi: {
          name: "CrewAI",
          description: "Collaborative AI development platform"
        },
        pinokio: {
          name: "Pinokio",
          description: "Automated workflow orchestration"
        },
        beeAgent: {
          name: "BeeAgent",
          description: "Intelligent task automation"
        },
        bolt: {
          name: "Bolt",
          description: "High-performance AI deployment"
        },
        anythingLlm: {
          name: "AnythingLLM",
          description: "Custom language model development"
        },
        continue: {
          name: "Continue",
          description: "Continuous AI learning and adaptation"
        },
        praisonAi: {
          name: "PraisonAI",
          description: "Advanced AI model training"
        },
        abacusAi: {
          name: "AbacusAI",
          description: "AI-powered data analytics"
        }
      },
      services: {
        title: "AI Services & Solutions",
        categories: {
          all: "All Services",
          content: "Content Creation",
          audio: "Audio & Voice",
          visual: "Visual & 3D",
          development: "Development"
        },
        items: {
          docs: {
            title: "AI Document Generation",
            description: "Generate professional documents using GPT-4, Claude, and Gemini. From reports to presentations, our AI creates content that perfectly matches your brand voice and style."
          },
          blog: {
            title: "AI Blog & Article Writing",
            description: "Create compelling content using GPT-4, Claude, Gemini, and Groq. Our multi-model approach ensures high-quality, SEO-optimized articles that engage your audience and drive traffic."
          },
          podcast: {
            title: "AI Podcast Production",
            description: "Transform your content into engaging podcasts using advanced AI voice synthesis. Featuring natural-sounding voices and professional audio quality powered by ElevenLabs and OpenAI."
          },
          video: {
            title: "AI Video Creation",
            description: "Produce stunning videos with AI-generated scenes, Stable Diffusion visuals, and natural voice synthesis. Perfect for marketing, education, and entertainment."
          },
          social: {
            title: "Social Media Content",
            description: "Create engaging social posts using DALL-E 3, Midjourney, and GPT-4. Get AI-generated images, compelling captions, and trending hashtags that boost your social presence."
          },
          voice: {
            title: "AI Voice Synthesis",
            description: "Generate natural-sounding voices using ElevenLabs and OpenAI. Perfect for podcasts, videos, and applications, with support for multiple languages and emotions."
          },
          story: {
            title: "AI Story Creation",
            description: "Craft engaging narratives using GPT-4 and Claude's creative capabilities. From short stories to marketing narratives, bring your ideas to life with AI."
          },
          game: {
            title: "AI Game Development",
            description: "Create immersive games with AI-powered characters, procedural content generation, and dynamic environments using Unity and Unreal Engine integrations."
          },
          modeling: {
            title: "AI 3D Modeling",
            description: "Generate and optimize 3D models using Point-E, GET3D, and other AI tools. Perfect for games, AR/VR experiences, and product visualization."
          },
          product: {
            title: "Digital Product Development",
            description: "Build innovative digital products with seamless AI integration. Using GPT-4, Claude, and other models to create smart, responsive applications."
          },
          cv: {
            title: "AI Resume Optimization",
            description: "Create ATS-friendly resumes using GPT-4 and Claude. Get tailored content that highlights your skills and matches job requirements perfectly."
          },
          research: {
            title: "AI Research Assistant",
            description: "Accelerate research with AI-powered analysis using Claude and GPT-4. Get insights, summaries, and connections from complex data sets."
          }
        }
      },
      contact: {
        title: "Book a Meeting",
        description: "Schedule a consultation to discuss your AI integration needs",
        button: "Schedule Now"
      },
      chat: {
        title: "Chat with Arif",
        placeholder: "Ask me anything about AI solutions...",
        poweredBy: "Powered by Gemini AI"
      }
    }
  },
  de: {
    translation: {
      hero: {
        greeting: "Hallo, ich bin Kadir",
        roles: {
          architect: "KI-Lösungsarchitekt",
          integrator: "KI-Systemintegrator",
          technologist: "Kreativer Technologe"
        },
        description: "Ich entwickle intelligente Lösungen an der Schnittstelle von KI und menschlicher Kreativität",
        bookMeeting: "Termin vereinbaren"
      },
      nav: {
        language: "Sprache ändern"
      },
      sections: {
        skills: "Fähigkeiten & Expertise",
        tools: "Tools & Technologien",
        services: "KI-Services & Lösungen",
        contact: "Kontakt"
      },
      skills: {
        title: "Fähigkeiten & Expertise",
        categories: {
          ai: "KI & Maschinelles Lernen",
          frontend: "Frontend-Entwicklung",
          backend: "Backend-Entwicklung",
          devops: "DevOps & Cloud",
          creative: "Kreative Technologien"
        }
      },
      tools: {
        title: "Tools & Technologien",
        augmentCode: {
          name: "AugmentCode",
          description: "KI-gestützte Code-Verbesserung und -Optimierung"
        },
        copyCoder: {
          name: "CopyCoder",
          description: "Intelligentes Code-Kopieren und -Anpassung"
        },
        omniParser: {
          name: "OmniParser",
          description: "Universelles Daten-Parsing und -Konvertierung"
        },
        dataButton: {
          name: "DataButton",
          description: "Datenverarbeitung mit einem Klick"
        },
        rooCode: {
          name: "RooCode",
          description: "Fortgeschrittene Code-Generierung und -Analyse"
        },
        uiTars: {
          name: "UITars",
          description: "KI-gestützte UI-Komponentenerstellung"
        },
        codeium: {
          name: "Codeium",
          description: "Intelligente Code-Vervollständigung"
        },
        flutterFlow: {
          name: "FlutterFlow",
          description: "Visuelle Flutter-Entwicklung"
        },
        huggingFace: {
          name: "Hugging Face",
          description: "Neueste NLP-Modelle und Tools"
        },
        crewAi: {
          name: "CrewAI",
          description: "Kollaborative KI-Entwicklungsplattform"
        },
        pinokio: {
          name: "Pinokio",
          description: "Automatische Workflow-Orchestrierung"
        },
        beeAgent: {
          name: "BeeAgent",
          description: "Intelligente Aufgabenautomatisierung"
        },
        bolt: {
          name: "Bolt",
          description: "Hochleistungs-KI-Deployment"
        },
        anythingLlm: {
          name: "AnythingLLM",
          description: "Entwicklung benutzerdefinierter Sprachmodelle"
        },
        continue: {
          name: "Continue",
          description: "Kontinuierliches KI-Lernen und Anpassung"
        },
        praisonAi: {
          name: "PraisonAI",
          description: "Fortgeschrittenes KI-Modell-Training"
        },
        abacusAi: {
          name: "AbacusAI",
          description: "KI-gestützte Datenanalyse"
        }
      },
      services: {
        title: "KI-Services & Lösungen",
        categories: {
          all: "Alle Services",
          content: "Content-Erstellung",
          audio: "Audio & Sprache",
          visual: "Visuell & 3D",
          development: "Entwicklung"
        },
        items: {
          docs: {
            title: "KI-Dokumentenerstellung",
            description: "Erstellen Sie professionelle Dokumente mit GPT-4, Claude und Gemini. Von Berichten bis zu Präsentationen, unsere KI erstellt Inhalte, die perfekt zu Ihrer Marke passen."
          },
          blog: {
            title: "KI-Blog & Artikelerstellung",
            description: "Erstellen Sie fesselnde Inhalte mit GPT-4, Claude, Gemini und Groq. Unser Multi-Modell-Ansatz gewährleistet qualitativ hochwertige, SEO-optimierte Artikel."
          },
          podcast: {
            title: "KI-Podcast-Produktion",
            description: "Verwandeln Sie Ihre Inhalte in fesselnde Podcasts mit KI-Sprachsynthese. Natürlich klingende Stimmen und professionelle Audioqualität von ElevenLabs und OpenAI."
          },
          video: {
            title: "KI-Videoerstellung",
            description: "Erstellen Sie beeindruckende Videos mit KI-generierten Szenen, Stable Diffusion Visuals und Sprachsynthese. Perfekt für Marketing, Bildung und Unterhaltung."
          },
          social: {
            title: "Social Media Content",
            description: "Erstellen Sie ansprechende Social-Posts mit DALL-E 3, Midjourney und GPT-4. Erhalten Sie KI-generierte Bilder und packende Bildunterschriften."
          },
          voice: {
            title: "KI-Sprachsynthese",
            description: "Generieren Sie natürlich klingende Stimmen mit ElevenLabs und OpenAI. Perfekt für Podcasts, Videos und Anwendungen, mit Unterstützung verschiedener Sprachen."
          },
          story: {
            title: "KI-Storytelling",
            description: "Erstellen Sie fesselnde Geschichten mit den kreativen Fähigkeiten von GPT-4 und Claude. Von Kurzgeschichten bis zu Marketing-Narrativen."
          },
          game: {
            title: "KI-Spieleentwicklung",
            description: "Erstellen Sie immersive Spiele mit KI-gesteuerten Charakteren und dynamischen Umgebungen mit Unity- und Unreal Engine-Integrationen."
          },
          modeling: {
            title: "KI-3D-Modellierung",
            description: "Erstellen und optimieren Sie 3D-Modelle mit Point-E, GET3D und anderen KI-Tools. Perfekt für Spiele, AR/VR und Produktvisualisierung."
          },
          product: {
            title: "Digitale Produktentwicklung",
            description: "Entwickeln Sie innovative digitale Produkte mit nahtloser KI-Integration. Nutzen Sie GPT-4, Claude und andere Modelle für intelligente Anwendungen."
          },
          cv: {
            title: "KI-Lebenslauf-Optimierung",
            description: "Erstellen Sie ATS-freundliche Lebensläufe mit GPT-4 und Claude. Erhalten Sie Inhalte, die Ihre Fähigkeiten hervorheben und perfekt zu den Anforderungen passen."
          },
          research: {
            title: "KI-Forschungsassistent",
            description: "Beschleunigen Sie die Forschung mit KI-gestützter Analyse von Claude und GPT-4. Gewinnen Sie Erkenntnisse, Zusammenfassungen und Verbindungen aus komplexen Datensätzen."
          }
        }
      },
      contact: {
        title: "Termin vereinbaren",
        description: "Vereinbaren Sie eine Beratung zur KI-Integration",
        button: "Jetzt planen"
      },
      chat: {
        title: "Chat mit Arif",
        placeholder: "Fragen Sie alles über unsere KI-Lösungen...",
        poweredBy: "Unterstützt von Gemini AI"
      }
    }
  },
  tr: {
    translation: {
      hero: {
        greeting: "Merhaba, ben Kadir",
        roles: {
          architect: "Yapay Zeka Çözüm Mimarı",
          integrator: "Yapay Zeka Sistem Entegratörü",
          technologist: "Yaratıcı Teknoloji Uzmanı"
        },
        description: "Yapay zeka ve insan yaratıcılığının kesişiminde akıllı çözümler geliştiriyorum",
        bookMeeting: "Görüşme Planla"
      },
      nav: {
        language: "Dili Değiştir"
      },
      sections: {
        skills: "Yetenekler & Uzmanlık",
        tools: "Araçlar & Teknolojiler",
        services: "Yapay Zeka Hizmetleri",
        contact: "İletişime Geç"
      },
      skills: {
        title: "Yetenekler & Uzmanlık",
        categories: {
          ai: "Yapay Zeka & Makine Öğrenimi",
          frontend: "Önyüz Geliştirme",
          backend: "Arkayüz Geliştirme",
          devops: "DevOps & Bulut",
          creative: "Yaratıcı Teknolojiler"
        }
      },
      tools: {
        title: "Araçlar & Teknolojiler",
        augmentCode: {
          name: "AugmentCode",
          description: "Yapay zeka destekli kod geliştirme ve optimizasyon"
        },
        copyCoder: {
          name: "CopyCoder",
          description: "Akıllı kod kopyalama ve adaptasyon"
        },
        omniParser: {
          name: "OmniParser",
          description: "Evrensel veri ayrıştırma ve dönüştürme"
        },
        dataButton: {
          name: "DataButton",
          description: "Tek tıkla veri işleme çözümleri"
        },
        rooCode: {
          name: "RooCode",
          description: "Gelişmiş kod üretimi ve analizi"
        },
        uiTars: {
          name: "UITars",
          description: "Yapay zeka destekli UI bileşen oluşturma"
        },
        codeium: {
          name: "Codeium",
          description: "Akıllı kod tamamlama ve öneriler"
        },
        flutterFlow: {
          name: "FlutterFlow",
          description: "Flutter ile görsel uygulama geliştirme"
        },
        huggingFace: {
          name: "Hugging Face",
          description: "En son NLP modelleri ve araçları"
        },
        crewAi: {
          name: "CrewAI",
          description: "İşbirlikçi yapay zeka geliştirme platformu"
        },
        pinokio: {
          name: "Pinokio",
          description: "Otomatik iş akışı orkestrasyon"
        },
        beeAgent: {
          name: "BeeAgent",
          description: "Akıllı görev otomasyonu"
        },
        bolt: {
          name: "Bolt",
          description: "Yüksek performanslı yapay zeka dağıtımı"
        },
        anythingLlm: {
          name: "AnythingLLM",
          description: "Özel dil modeli geliştirme"
        },
        continue: {
          name: "Continue",
          description: "Sürekli yapay zeka öğrenimi ve adaptasyonu"
        },
        praisonAi: {
          name: "PraisonAI",
          description: "Gelişmiş yapay zeka model eğitimi"
        },
        abacusAi: {
          name: "AbacusAI",
          description: "Yapay zeka destekli veri analitiği"
        }
      },
      services: {
        title: "Yapay Zeka Hizmetleri",
        categories: {
          all: "Tüm Hizmetler",
          content: "İçerik Oluşturma",
          audio: "Ses & Konuşma",
          visual: "Görsel & 3B",
          development: "Geliştirme"
        },
        items: {
          docs: {
            title: "Yapay Zeka Belge Oluşturma",
            description: "GPT-4, Claude ve Gemini kullanarak profesyonel belgeler oluşturun. Raporlardan sunumlara, marka sesinize mükemmel uyan içerikler yaratın."
          },
          blog: {
            title: "Yapay Zeka Blog & Makale Yazımı",
            description: "GPT-4, Claude, Gemini ve Groq kullanarak etkileyici içerikler oluşturun. Çoklu model yaklaşımımızla SEO odaklı, hedef kitlenizi yakalayan makaleler üretin."
          },
          podcast: {
            title: "Yapay Zeka Podcast Üretimi",
            description: "İçeriğinizi ElevenLabs ve OpenAI destekli doğal ses sentezi ile etkileyici podcastlere dönüştürün. Profesyonel ses kalitesiyle dinleyicilerinizi etkileyin."
          },
          video: {
            title: "Yapay Zeka Video Oluşturma",
            description: "Stable Diffusion görselleri ve doğal ses sentezi ile etkileyici videolar üretin. Pazarlama, eğitim ve eğlence için mükemmel çözüm."
          },
          social: {
            title: "Sosyal Medya İçeriği",
            description: "DALL-E 3, Midjourney ve GPT-4 ile etkileyici sosyal medya gönderileri oluşturun. Yapay zeka üretimli görseller ve dikkat çeken açıklamalarla sosyal varlığınızı güçlendirin."
          },
          voice: {
            title: "Yapay Zeka Ses Sentezi",
            description: "ElevenLabs ve OpenAI ile doğal ses üretimi. Podcast, video ve uygulamalar için çoklu dil ve duygu desteği ile mükemmel çözüm."
          },
          story: {
            title: "Yapay Zeka Hikaye Oluşturma",
            description: "GPT-4 ve Claude'un yaratıcı yetenekleriyle etkileyici hikayeler oluşturun. Kısa hikayelerden pazarlama anlatılarına, fikirlerinizi yapay zeka ile hayata geçirin."
          },
          game: {
            title: "Yapay Zeka Oyun Geliştirme",
            description: "Unity ve Unreal Engine entegrasyonları ile yapay zeka destekli karakterler ve dinamik ortamlar içeren sürükleyici oyunlar yaratın."
          },
          modeling: {
            title: "Yapay Zeka 3B Modelleme",
            description: "Point-E, GET3D ve diğer yapay zeka araçlarıyla 3B modeller oluşturun ve optimize edin. Oyunlar, AR/VR deneyimleri ve ürün görselleştirme için ideal."
          },
          product: {
            title: "Dijital Ürün Geliştirme",
            description: "GPT-4, Claude ve diğer modellerle sorunsuz yapay zeka entegrasyonuna sahip yenilikçi dijital ürünler geliştirin."
          },
          cv: {
            title: "Yapay Zeka CV Optimizasyonu",
            description: "GPT-4 ve Claude kullanarak ATS dostu özgeçmişler oluşturun. Yeteneklerinizi öne çıkaran ve iş gereksinimlerine mükemmel uyan içerik elde edin."
          },
          research: {
            title: "Yapay Zeka Araştırma Asistanı",
            description: "Claude ve GPT-4 ile yapay zeka destekli analiz. Karmaşık veri setlerinden içgörüler, özetler ve bağlantılar elde edin."
          }
        }
      },
      contact: {
        title: "Görüşme Planla",
        description: "Yapay zeka entegrasyon ihtiyaçlarınızı görüşmek için randevu alın",
        button: "Şimdi Planla"
      },
      chat: {
        title: "Arif ile Sohbet",
        placeholder: "Yapay zeka çözümleri hakkında her şeyi sorabilirsiniz...",
        poweredBy: "Gemini AI tarafından desteklenmektedir"
      }
    }
  },
  ru: {
    translation: {
      hero: {
        greeting: "Привет, я Кадир",
        roles: {
          architect: "Архитектор AI решений",
          integrator: "Интегратор AI систем",
          technologist: "Креативный технолог"
        },
        description: "Создаю интеллектуальные решения на стыке искусственного интеллекта и человеческого творчества",
        bookMeeting: "Запланировать встречу"
      },
      nav: {
        language: "Изменить язык"
      },
      sections: {
        skills: "Навыки и экспертиза",
        tools: "Инструменты и технологии",
        services: "AI сервисы и решения",
        contact: "Связаться"
      },
      skills: {
        title: "Навыки и экспертиза",
        categories: {
          ai: "AI и машинное обучение",
          frontend: "Frontend разработка",
          backend: "Backend разработка",
          devops: "DevOps и облачные технологии",
          creative: "Креативные технологии"
        }
      },
      tools: {
        title: "Инструменты и технологии",
        augmentCode: {
          name: "AugmentCode",
          description: "Улучшение и оптимизация кода с помощью AI"
        },
        copyCoder: {
          name: "CopyCoder",
          description: "Умное копирование и адаптация кода"
        },
        omniParser: {
          name: "OmniParser",
          description: "Универсальный парсинг и преобразование данных"
        },
        dataButton: {
          name: "DataButton",
          description: "Обработка данных одним нажатием"
        },
        rooCode: {
          name: "RooCode",
          description: "Продвинутая генерация и анализ кода"
        },
        uiTars: {
          name: "UITars",
          description: "Создание UI компонентов с помощью AI"
        },
        codeium: {
          name: "Codeium",
          description: "Умное автодополнение и рекомендации кода"
        },
        flutterFlow: {
          name: "FlutterFlow",
          description: "Визуальная разработка на Flutter"
        },
        huggingFace: {
          name: "Hugging Face",
          description: "Новейшие NLP модели и инструменты"
        },
        crewAi: {
          name: "CrewAI",
          description: "Платформа для совместной разработки AI"
        },
        pinokio: {
          name: "Pinokio",
          description: "Автоматическая оркестрация рабочих процессов"
        },
        beeAgent: {
          name: "BeeAgent",
          description: "Умная автоматизация задач"
        },
        bolt: {
          name: "Bolt",
          description: "Высокопроизводительное развертывание AI"
        },
        anythingLlm: {
          name: "AnythingLLM",
          description: "Разработка пользовательских языковых моделей"
        },
        continue: {
          name: "Continue",
          description: "Непрерывное обучение и адаптация AI"
        },
        praisonAi: {
          name: "PraisonAI",
          description: "Продвинутое обучение AI моделей"
        },
        abacusAi: {
          name: "AbacusAI",
          description: "Аналитика данных с помощью AI"
        }
      },
      services: {
        title: "AI сервисы и решения",
        categories: {
          all: "Все сервисы",
          content: "Создание контента",
          audio: "Аудио и голос",
          visual: "Визуальное и 3D",
          development: "Разработка"
        },
        items: {
          docs: {
            title: "AI генерация документов",
            description: "Создавайте профессиональные документы с помощью GPT-4, Claude и Gemini. От отчетов до презентаций, наш AI создает контент, идеально соответствующий вашему бренду."
          },
          blog: {
            title: "AI написание блогов и статей",
            description: "Создавайте увлекательный контент с помощью GPT-4, Claude, Gemini и Groq. Наш мультимодельный подход обеспечивает качественные, SEO-оптимизированные статьи."
          },
          podcast: {
            title: "AI создание подкастов",
            description: "Преобразуйте ваш контент в увлекательные подкасты с помощью AI синтеза речи. Естественное звучание голоса и профессиональное качество звука от ElevenLabs и OpenAI."
          },
          video: {
            title: "AI создание видео",
            description: "Создавайте впечатляющие видео с AI-генерированными сценами, визуальными эффектами Stable Diffusion и синтезом речи. Идеально для маркетинга, обучения и развлечений."
          },
          social: {
            title: "Контент для соцсетей",
            description: "Создавайте привлекательные посты с помощью DALL-E 3, Midjourney и GPT-4. Получайте AI-генерированные изображения и захватывающие описания."
          },
          voice: {
            title: "AI синтез речи",
            description: "Генерируйте естественное звучание голоса с помощью ElevenLabs и OpenAI. Идеально для подкастов, видео и приложений, с поддержкой разных языков."
          },
          story: {
            title: "AI создание историй",
            description: "Создавайте увлекательные истории с помощью творческих возможностей GPT-4 и Claude. От коротких рассказов до маркетинговых нарративов."
          },
          game: {
            title: "AI разработка игр",
            description: "Создавайте захватывающие игры с AI-персонажами и динамичным окружением, используя интеграции с Unity и Unreal Engine."
          },
          modeling: {
            title: "AI 3D моделирование",
            description: "Создавайте и оптимизируйте 3D модели с помощью Point-E, GET3D и других AI инструментов. Идеально для игр, AR/VR и визуализации продуктов."
          },
          product: {
            title: "Разработка цифровых продуктов",
            description: "Создавайте инновационные цифровые продукты с бесшовной интеграцией AI. Используйте GPT-4, Claude и другие модели для умных приложений."
          },
          cv: {
            title: "AI оптимизация резюме",
            description: "Создавайте ATS-friendly резюме с помощью GPT-4 и Claude. Получайте контент, который выделяет ваши навыки и идеально соответствует требованиям."
          },
          research: {
            title: "AI ассистент исследований",
            description: "Ускорьте исследования с помощью AI-анализа от Claude и GPT-4. Получайте инсайты, резюме и связи из сложных наборов данных."
          }
        }
      },
      contact: {
        title: "Запланировать встречу",
        description: "Запишитесь на консультацию по интеграции AI решений",
        button: "Запланировать"
      },
      chat: {
        title: "Чат с Арифом",
        placeholder: "Спросите что угодно о наших AI решениях...",
        poweredBy: "Работает на Gemini AI"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'tr', 'ru', 'de'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
