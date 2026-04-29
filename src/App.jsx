import React, { useState, useEffect } from 'react';
import './App.css';
import { initDummyData } from './utils/storage';
import MobileFrame from './components/MobileFrame';
import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import PINScreen from './screens/PINScreen';
import DashboardScreen from './screens/DashboardScreen';
import HouseholdScreen from './screens/HouseholdScreen';
import ECRegistrationScreen from './screens/ECRegistrationScreen';
import PregnantWomanScreen from './screens/PregnantWomanScreen';
import ANCScreen from './screens/ANCScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import HBPNCScreen from './screens/HBPNCScreen';
import ChildRegistrationScreen from './screens/ChildRegistrationScreen';
import VaccinationScreen from './screens/VaccinationScreen';
import HBNCScreen from './screens/HBNCScreen';
import HBYCScreen from './screens/HBYCScreen';
import HBNCReportScreen from './screens/HBNCReportScreen';
import FPCounselingScreen from './screens/FPCounselingScreen';
import FPServicesScreen from './screens/FPServicesScreen';
import AdolescentRegistrationScreen from './screens/AdolescentRegistrationScreen';
import AdolescentScreeningScreen from './screens/AdolescentScreeningScreen';
import TBScreeningScreen from './screens/TBScreeningScreen';
import HypertensionScreen from './screens/HypertensionScreen';
import DiabetesScreen from './screens/DiabetesScreen';
import OralScreeningScreen from './screens/OralScreeningScreen';
import BreastCervicalScreen from './screens/BreastCervicalScreen';
import CBACScreen from './screens/CBACSCreenScreen';
import GeriatricRegistrationScreen from './screens/GeriatricRegistrationScreen';
import GeriatricScreeningScreen from './screens/GeriatricScreeningScreen';
import PalliativeRegistrationScreen from './screens/PalliativeRegistrationScreen';
import PalliativeCarePlanScreen from './screens/PalliativeCarePlanScreen';
import MentalHealthScreen from './screens/MentalHealthScreen';
import CounselingSessionScreen from './screens/CounselingSessionScreen';
import OralHealthEducationScreen from './screens/OralHealthEducationScreen';
import ENTScreeningScreen from './screens/ENTScreeningScreen';
import EmergencyReportingScreen from './screens/EmergencyReportingScreen';
import FirstAidGuidanceScreen from './screens/FirstAidGuidanceScreen';
import VHSNDScreen from './screens/VHSNDScreen';
import NCDScreen from './screens/NCDScreen';
import TBScreen from './screens/TBScreen';
import SurveillanceScreen from './screens/SurveillanceScreen';
import SyncScreen from './screens/SyncScreen';
import ReportsScreen from './screens/ReportsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [navHistory, setNavHistory] = useState([]);

  useEffect(() => { initDummyData(); }, []);

  const navigate = (screen) => {
    setNavHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (navHistory.length > 0) {
      const prev = navHistory[navHistory.length - 1];
      setNavHistory(h => h.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const renderScreen = () => {
    const props = { onNavigate: navigate, onBack: goBack };
    switch (currentScreen) {
      case 'login':           return <LoginScreen onNavigate={navigate} />;
      case 'otp':             return <OTPScreen {...props} />;
      case 'pin':             return <PINScreen {...props} />;
      case 'dashboard':       return <DashboardScreen onNavigate={navigate} />;
      // Household
      case 'household':       return <HouseholdScreen {...props} />;
      // Maternal Health
      case 'ec':              return <ECRegistrationScreen {...props} />;
      case 'pregnant':        return <PregnantWomanScreen {...props} />;
      case 'anc':             return <ANCScreen {...props} />;
      case 'delivery':        return <DeliveryScreen {...props} />;
      case 'hbpnc':           return <HBPNCScreen {...props} />;
      // Child Health
      case 'child':           return <ChildRegistrationScreen {...props} />;
      case 'vaccination':     return <VaccinationScreen {...props} />;
      case 'hbnc':            return <HBNCScreen {...props} />;
      case 'hbyc':            return <HBYCScreen {...props} />;
      case 'hbncreport':      return <HBNCReportScreen {...props} />;
      // Family Planning
      case 'fpcounseling':    return <FPCounselingScreen {...props} />;
      case 'fpservices':      return <FPServicesScreen {...props} />;
      // Adolescent
      case 'adolescent':      return <AdolescentRegistrationScreen {...props} />;
      case 'adolescentscreen':return <AdolescentScreeningScreen {...props} />;
      // Communicable Diseases
      case 'tbscreening':     return <TBScreeningScreen {...props} />;
      case 'surveillance':    return <SurveillanceScreen {...props} />;
      case 'tb':              return <TBScreen {...props} />;
      // NCDs
      case 'hypertension':    return <HypertensionScreen {...props} />;
      case 'diabetes':        return <DiabetesScreen {...props} />;
      case 'oralscreening':   return <OralScreeningScreen {...props} />;
      case 'breastcervical':  return <BreastCervicalScreen {...props} />;
      case 'cbac':            return <CBACScreen {...props} />;
      case 'ncd':             return <NCDScreen {...props} />;
      // Geriatric
      case 'geriatricreg':    return <GeriatricRegistrationScreen {...props} />;
      case 'geriatricscreen': return <GeriatricScreeningScreen {...props} />;
      // Palliative
      case 'palliativereg':   return <PalliativeRegistrationScreen {...props} />;
      case 'palliativeplan':  return <PalliativeCarePlanScreen {...props} />;
      // Mental Health
      case 'mentalhealth':    return <MentalHealthScreen {...props} />;
      case 'counseling':      return <CounselingSessionScreen {...props} />;
      // Oral Health
      case 'oraleducation':   return <OralHealthEducationScreen {...props} />;
      // ENT
      case 'ent':             return <ENTScreeningScreen {...props} />;
      // Emergency
      case 'emergency':       return <EmergencyReportingScreen {...props} />;
      case 'firstaid':        return <FirstAidGuidanceScreen {...props} />;
      // VHSND
      case 'vhsnd':           return <VHSNDScreen {...props} />;
      // Reports & Sync
      case 'sync':            return <SyncScreen {...props} />;
      case 'reports':         return <ReportsScreen {...props} />;
      default:                return <DashboardScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="mobile-frame-wrapper">
      <MobileFrame>{renderScreen()}</MobileFrame>
    </div>
  );
}

export default App;
