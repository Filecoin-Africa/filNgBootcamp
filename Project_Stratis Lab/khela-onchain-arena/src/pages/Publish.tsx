
import React from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import PublisherApplicationForm from '@/components/PublisherApplicationForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Newspaper, Users, TrendingUp } from 'lucide-react';

const Publish: React.FC = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Become a Publisher
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the Khela Onchain Arena as a trusted sports content publisher and share your analysis with our growing Web3 community.
            </p>
          </div>

          {/* Main Content */}
          {isConnected ? (
            <PublisherApplicationForm />
          ) : (
            <Card className="backdrop-blur-sm bg-card/30 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl text-center">Connect Your Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-6">
                  Connect your wallet to submit a publisher application. Your application will be stored securely on Filecoin.
                </p>
                <div className="flex justify-center">
                  <ConnectButton showBalance={false} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <FeatureCard
              icon={<Trophy className="w-8 h-8 text-primary" />}
              title="Verified Publisher Status"
              description="Gain credibility with a verified publisher badge and build your reputation in the Web3 sports community."
            />
            <FeatureCard
              icon={<Newspaper className="w-8 h-8 text-primary" />}
              title="Content Ownership"
              description="Your content is stored on Filecoin, ensuring true ownership and censorship resistance."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-primary" />}
              title="Community Access"
              description="Connect with passionate sports fans and analysts in our growing Web3 ecosystem."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-primary" />}
              title="Revenue Potential"
              description="Earn rewards through token incentives for quality content and analysis."
            />
          </div>

          {/* Process Section */}
          <div className="rounded-xl backdrop-blur-sm bg-card/30 border border-primary/20 p-8 mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Application Process</h2>
            <div className="grid gap-4">
              <ProcessStep
                number="1"
                title="Submit Application"
                description="Fill out the application form with your details and experience"
              />
              <ProcessStep
                number="2"
                title="Secure Storage"
                description="Your application is stored on Filecoin through Lighthouse"
              />
              <ProcessStep
                number="3"
                title="Review Process"
                description="Our team reviews your application and sample work"
              />
              <ProcessStep
                number="4"
                title="Get Access"
                description="Approved publishers receive access to the content publishing platform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="rounded-xl backdrop-blur-sm bg-card/30 border border-primary/20 p-6 hover:bg-card/40 transition-colors">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/20 hover:bg-card/30 transition-colors">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
      {number}
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
);

export default Publish;
