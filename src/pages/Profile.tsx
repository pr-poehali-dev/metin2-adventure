import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  character_name: string;
  character_class: string;
  character_level: number;
  created_at: string;
  last_login: string;
  stats: {
    total_score: number;
    pvp_kills: number;
    pve_bosses_killed: number;
    quests_completed: number;
    playtime_hours: number;
    rank: number | null;
    guild: string | null;
  };
}

const Profile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get('username');
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) {
      setError('Имя пользователя не указано');
      setLoading(false);
      return;
    }

    fetch(`https://functions.poehali.dev/6163b46c-ba02-42e9-b9c8-33c669575c46?username=${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setProfile(data.profile);
        } else {
          setError(data.error || 'Профиль не найден');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading profile:', err);
        setError('Ошибка загрузки профиля');
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Загрузка профиля...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg mb-4">{error}</p>
          <Button onClick={() => navigate('/')}>На главную</Button>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      icon: "Trophy", 
      label: "Рейтинг", 
      value: profile.stats.rank ? `#${profile.stats.rank}` : 'Нет в рейтинге',
      color: "text-yellow-500"
    },
    { 
      icon: "Swords", 
      label: "PvP Убийств", 
      value: profile.stats.pvp_kills,
      color: "text-red-500"
    },
    { 
      icon: "Shield", 
      label: "Боссов Убито", 
      value: profile.stats.pve_bosses_killed,
      color: "text-blue-500"
    },
    { 
      icon: "CheckCircle", 
      label: "Квестов Завершено", 
      value: profile.stats.quests_completed,
      color: "text-green-500"
    },
    { 
      icon: "Clock", 
      label: "Часов в игре", 
      value: profile.stats.playtime_hours,
      color: "text-purple-500"
    },
    { 
      icon: "Star", 
      label: "Общий счёт", 
      value: profile.stats.total_score.toLocaleString(),
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/img/62c39a7c-2624-4abf-a5ae-5b043bf9ba0a.jpg" alt="Logo" className="h-12 w-12 rounded-lg" />
              <h1 className="font-cinzel text-3xl font-bold text-primary-foreground">METIN2</h1>
            </div>
            <Button onClick={() => navigate('/')} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Icon name="Home" className="mr-2" size={18} />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="border-border bg-card mb-8">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-cinzel text-3xl text-card-foreground mb-2">
                    {profile.character_name}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-accent text-accent-foreground">
                      {profile.character_class}
                    </Badge>
                    <Badge variant="outline" className="border-accent text-accent">
                      Уровень {profile.character_level}
                    </Badge>
                    {profile.stats.guild && (
                      <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                        <Icon name="Users" className="mr-1" size={14} />
                        {profile.stats.guild}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Аккаунт</p>
                  <p className="text-foreground font-semibold">{profile.username}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="text-foreground font-semibold">{profile.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Зарегистрирован</p>
                  <p className="text-foreground font-semibold">
                    {new Date(profile.created_at).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Последний вход</p>
                  <p className="text-foreground font-semibold">
                    {profile.last_login ? new Date(profile.last_login).toLocaleDateString('ru-RU') : 'Никогда'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <h2 className="font-cinzel text-2xl font-bold text-foreground mb-4">Статистика</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="border-border bg-card hover:border-accent transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-gradient-to-br from-primary to-accent ${stat.color}`}>
                      <Icon name={stat.icon as any} size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {profile.stats.rank && profile.stats.rank <= 10 && (
            <Card className="mt-8 border-accent bg-gradient-to-r from-accent/10 to-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Icon name="Award" className="text-accent" size={48} />
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-foreground mb-1">
                      Топ-10 игрок сервера!
                    </h3>
                    <p className="text-muted-foreground">
                      Вы занимаете {profile.stats.rank} место в рейтинге. Продолжайте в том же духе!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
