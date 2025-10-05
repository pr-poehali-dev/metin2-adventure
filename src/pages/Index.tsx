import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RegisterModal from "@/components/RegisterModal";
import LoginModal from "@/components/LoginModal";

interface PlayerRating {
  player_name: string;
  level: number;
  class: string;
  guild: string | null;
  total_score: number;
  pvp_kills: number;
  pve_bosses_killed: number;
  quests_completed: number;
  playtime_hours: number;
  rank: number;
}

const Index = () => {
  const [ratings, setRatings] = useState<PlayerRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://functions.poehali.dev/c10649c4-fe9a-4f68-a1f0-d87a6728f97c')
      .then(res => res.json())
      .then(data => {
        setRatings(data.ratings);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading ratings:', err);
        setLoading(false);
      });
  }, []);

  const handleRegisterSuccess = (username: string) => {
    setUser(username);
  };

  const handleLoginSuccess = (username: string) => {
    setUser(username);
  };
  const news = [
    {
      id: 1,
      title: "Новое обновление: Подземелье Теней",
      description: "Исследуйте опасные подземелья, сражайтесь с боссами и получайте легендарные награды!",
      date: "15 Октября 2025",
      image: "/img/5c8c5c41-a5ba-4812-a86d-df6975ff6995.jpg"
    },
    {
      id: 2,
      title: "Система квестов расширена",
      description: "Более 50 новых PvE заданий с уникальными наградами и прокачкой персонажа.",
      date: "10 Октября 2025",
      image: "/img/eb2e6c40-5992-4232-8383-00506b1e015f.jpg"
    },
    {
      id: 3,
      title: "Октябрьский ивент запущен!",
      description: "Участвуйте в сезонных мероприятиях и получайте эксклюзивные награды.",
      date: "1 Октября 2025",
      image: "/img/62c39a7c-2624-4abf-a5ae-5b043bf9ba0a.jpg"
    }
  ];

  const features = [
    {
      icon: "Swords",
      title: "PvE Контент",
      description: "Фокус на кооперативное прохождение и битвы с монстрами"
    },
    {
      icon: "Trophy",
      title: "Система Рейтингов",
      description: "Соревнуйтесь с другими игроками за место в топе"
    },
    {
      icon: "Sparkles",
      title: "Прокачка",
      description: "Развивайте своего персонажа до максимального уровня"
    },
    {
      icon: "Shield",
      title: "Квесты",
      description: "Сотни уникальных заданий и эпических приключений"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/img/62c39a7c-2624-4abf-a5ae-5b043bf9ba0a.jpg" alt="Logo" className="h-12 w-12 rounded-lg" />
              <h1 className="font-cinzel text-3xl font-bold text-primary-foreground">METIN2</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-foreground hover:text-accent transition-colors">Главная</a>
              <a href="#news" className="text-foreground hover:text-accent transition-colors">Новости</a>
              <a href="#download" className="text-foreground hover:text-accent transition-colors">Скачать</a>
              <a href="#ratings" className="text-foreground hover:text-accent transition-colors">Рейтинги</a>
              <a href="#donate" className="text-foreground hover:text-accent transition-colors">Донат</a>
            </div>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-foreground">Привет, <span className="font-semibold text-accent">{user}</span>!</span>
                <Button 
                  onClick={() => setUser(null)}
                  variant="outline"
                  size="sm"
                  className="border-border"
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setLoginOpen(true)}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Вход
                </Button>
                <Button 
                  onClick={() => setRegisterOpen(true)}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold"
                >
                  Регистрация
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section id="home" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-accent text-accent-foreground">PvE Сервер</Badge>
              <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
                Начни своё приключение
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Погрузись в мир восточных легенд. Прокачай персонажа, исследуй подземелья и стань легендой!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold">
                  <Icon name="Download" className="mr-2" size={20} />
                  Скачать игру
                </Button>
                <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="/img/eb2e6c40-5992-4232-8383-00506b1e015f.jpg" 
                alt="Hero" 
                className="rounded-xl shadow-2xl border-2 border-accent/50"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg bg-background border border-border hover:border-accent transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                  <Icon name={feature.icon as any} className="text-primary-foreground" size={28} />
                </div>
                <h3 className="font-cinzel text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Последние новости</h2>
            <p className="text-muted-foreground text-lg">Будьте в курсе всех обновлений и событий</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Card 
                key={item.id} 
                className="overflow-hidden border-border hover:border-accent transition-all hover:scale-105 animate-fade-in bg-card"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">{item.date}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-cinzel text-xl font-semibold text-card-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <Button 
                    variant="ghost" 
                    className="text-accent hover:text-accent hover:bg-accent/10 p-0 h-auto font-semibold"
                  >
                    Читать далее
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="ratings" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Топ игроков</h2>
            <p className="text-muted-foreground text-lg">Лучшие воины нашего сервера</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-0">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Загрузка рейтинга...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-center w-16 font-cinzel">Ранг</TableHead>
                        <TableHead className="font-cinzel">Игрок</TableHead>
                        <TableHead className="text-center font-cinzel">Уровень</TableHead>
                        <TableHead className="font-cinzel">Класс</TableHead>
                        <TableHead className="font-cinzel">Гильдия</TableHead>
                        <TableHead className="text-center font-cinzel">Очки</TableHead>
                        <TableHead className="text-center font-cinzel">Боссы</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ratings.map((player, index) => (
                        <TableRow 
                          key={player.rank} 
                          className="border-border hover:bg-accent/5 transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <TableCell className="text-center font-bold">
                            {player.rank <= 3 ? (
                              <Badge className={
                                player.rank === 1 ? "bg-yellow-500 text-yellow-950" :
                                player.rank === 2 ? "bg-gray-400 text-gray-950" :
                                "bg-amber-600 text-amber-950"
                              }>
                                #{player.rank}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">#{player.rank}</span>
                            )}
                          </TableCell>
                          <TableCell className="font-semibold text-foreground">{player.player_name}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="border-accent text-accent">
                              {player.level}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{player.class}</TableCell>
                          <TableCell className="text-muted-foreground">{player.guild || '—'}</TableCell>
                          <TableCell className="text-center font-semibold text-accent">
                            {player.total_score.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {player.pve_bosses_killed}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="download" className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Готов начать играть?</h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Скачай клиент игры прямо сейчас и погрузись в мир Metin2. Бесплатная регистрация!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Icon name="Download" className="mr-2" size={20} />
              Скачать для Windows
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Системные требования
            </Button>
          </div>
        </div>
      </section>

      <RegisterModal 
        open={registerOpen} 
        onOpenChange={setRegisterOpen}
        onSuccess={handleRegisterSuccess}
      />
      
      <LoginModal 
        open={loginOpen} 
        onOpenChange={setLoginOpen}
        onSuccess={handleLoginSuccess}
      />

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-foreground mb-4">METIN2</h3>
              <p className="text-muted-foreground">Лучший PvE сервер с фокусом на прокачку и квесты</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-muted-foreground hover:text-accent transition-colors">Главная</a></li>
                <li><a href="#news" className="text-muted-foreground hover:text-accent transition-colors">Новости</a></li>
                <li><a href="#download" className="text-muted-foreground hover:text-accent transition-colors">Скачать</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Сообщество</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Discord</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Форум</a></li>
                <li><a href="#ratings" className="text-muted-foreground hover:text-accent transition-colors">Рейтинги</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Поддержка</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">FAQ</a></li>
                <li><a href="#donate" className="text-muted-foreground hover:text-accent transition-colors">Донат</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Правила</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2025 Metin2 PvE Server. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;