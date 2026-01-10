import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  Globe, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail, 
  Lock,
  ArrowRight,
  Zap,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export default function Login() {
  const navigate = useNavigate();
  const { login, demoLogin, language, setLanguage } = useApp();
  
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));
    
    login(email || mobile, password);
    navigate('/dashboard');
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    demoLogin();
    navigate('/dashboard');
  };

  const features = [
    { icon: '🧾', text: language === 'ta' ? 'GST இணக்கமான பில்லிங்' : 'GST Compliant Billing' },
    { icon: '📊', text: language === 'ta' ? 'நிகழ்நேர அறிக்கைகள்' : 'Real-time Reports' },
    { icon: '📱', text: language === 'ta' ? 'அனைத்து சாதனங்களிலும்' : 'Works on All Devices' },
    { icon: '🏪', text: language === 'ta' ? 'அனைத்து வணிகங்களுக்கும்' : 'For All Business Types' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Receipt className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">
                  {language === 'ta' ? 'யுனிவர்சல் பில்' : 'Universal Bill'}
                </h1>
                <p className="text-primary-foreground/70 text-sm">Tamil Nadu Edition</p>
              </div>
            </div>

            <h2 className="text-4xl xl:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              {language === 'ta' 
                ? 'உங்கள் வணிகத்திற்கான முழுமையான பில்லிங் தீர்வு'
                : 'Complete Billing Solution for Your Business'
              }
            </h2>

            <p className="text-lg text-primary-foreground/80 mb-10">
              {language === 'ta'
                ? 'சில்லறை, மொத்த, உணவகம், மருந்து கடை - அனைத்து வணிகங்களுக்கும் ஏற்றது'
                : 'Perfect for Retail, Wholesale, Restaurant, Pharmacy - All Business Types'
              }
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl p-4"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm text-primary-foreground font-medium">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Language Toggle */}
        <div className="flex justify-end p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'தமிழ்' : 'English'}
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Receipt className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">
                {language === 'ta' ? 'யுனிவர்சல் பில்' : 'Universal Bill'}
              </span>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold">
                {language === 'ta' ? 'வரவேற்கிறோம்!' : 'Welcome back!'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {language === 'ta' 
                  ? 'உங்கள் கணக்கில் உள்நுழையுங்கள்'
                  : 'Sign in to your account to continue'
                }
              </p>
            </div>

            {/* Demo Login Button */}
            <Button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground gap-3"
            >
              <Zap className="h-5 w-5" />
              {language === 'ta' ? 'டெமோ உள்நுழைவு (1-கிளிக்)' : 'Demo Login (1-Click)'}
              <ArrowRight className="h-5 w-5" />
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground">
                  {language === 'ta' ? 'அல்லது' : 'or'}
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Login Method Toggle */}
              <div className="flex rounded-xl bg-secondary p-1">
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all',
                    loginMethod === 'email'
                      ? 'bg-card shadow-sm text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <Mail className="h-4 w-4" />
                  {language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('mobile')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all',
                    loginMethod === 'mobile'
                      ? 'bg-card shadow-sm text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <Smartphone className="h-4 w-4" />
                  {language === 'ta' ? 'மொபைல்' : 'Mobile'}
                </button>
              </div>

              {/* Email/Mobile Input */}
              <div className="space-y-2">
                <Label>
                  {loginMethod === 'email' 
                    ? (language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address')
                    : (language === 'ta' ? 'மொபைல் எண்' : 'Mobile Number')
                  }
                </Label>
                {loginMethod === 'email' ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rajesh@store.com"
                      className="pl-10 h-12"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      className="pl-10 h-12"
                      maxLength={10}
                    />
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{language === 'ta' ? 'கடவுச்சொல்' : 'Password'}</Label>
                  <Button variant="link" className="px-0 text-primary h-auto">
                    {language === 'ta' ? 'மறந்துவிட்டீர்களா?' : 'Forgot password?'}
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  {language === 'ta' ? 'என்னை நினைவில் கொள்' : 'Remember me'}
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold"
              >
                {isLoading 
                  ? (language === 'ta' ? 'உள்நுழைகிறது...' : 'Signing in...')
                  : (language === 'ta' ? 'உள்நுழை' : 'Sign In')
                }
              </Button>
            </form>

            {/* Help Text */}
            <p className="text-center text-sm text-muted-foreground">
              {language === 'ta' 
                ? 'உதவி வேண்டுமா? ' 
                : 'Need help? '
              }
              <Button variant="link" className="px-1 h-auto text-primary">
                {language === 'ta' ? 'எங்களை தொடர்பு கொள்ளுங்கள்' : 'Contact Support'}
              </Button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
