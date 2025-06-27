import ConferenceForm from "@/components/ConferenceForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Техническая конференция 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Присоединяйтесь к крупнейшему событию в сфере технологий. Заполните
            форму для участия и получите доступ к эксклюзивным докладам и
            networking.
          </p>
        </div>

        <ConferenceForm />
      </div>
    </div>
  );
};

export default Index;
