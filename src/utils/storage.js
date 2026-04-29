export const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
export const getData = (key) => JSON.parse(localStorage.getItem(key) || 'null');
export const appendData = (key, item) => {
  const existing = getData(key) || [];
  saveData(key, [...existing, { ...item, id: Date.now() }]);
};

export const initDummyData = () => {
  if (!getData('initialized')) {
    saveData('user', {
      name: 'Priya Sharma',
      role: 'ANM',
      id: 'ANM-MP-2024-00142',
      center: 'PHC Bhopal Urban, Sub-Center Ward-7',
      mobile: '+91-9876547890'
    });

    saveData('pregnantWomen', [
      {
        id: 1,
        samagraId: 'SG-001234',
        name: 'Sunita Devi',
        husband: 'Ramesh Kumar',
        mobile: '9876501234',
        lmp: '2024-03-15',
        edd: '2024-12-20',
        isHRP: true,
        hrpConditions: ['Anaemia', 'Hypertension'],
        bloodGroup: 'B+',
        prevPregnancies: 2,
        height: 152,
        weight: 58,
        ancVisits: 2
      },
      {
        id: 2,
        samagraId: 'SG-001235',
        name: 'Meena Bai',
        husband: 'Suresh Patel',
        mobile: '9876502345',
        lmp: '2024-05-01',
        edd: '2025-02-05',
        isHRP: false,
        hrpConditions: [],
        bloodGroup: 'O+',
        prevPregnancies: 1,
        height: 158,
        weight: 62,
        ancVisits: 1
      },
      {
        id: 3,
        samagraId: 'SG-001236',
        name: 'Kavita Singh',
        husband: 'Anil Singh',
        mobile: '9876503456',
        lmp: '2024-06-10',
        edd: '2025-03-17',
        isHRP: true,
        hrpConditions: ['Diabetes'],
        bloodGroup: 'A+',
        prevPregnancies: 0,
        height: 155,
        weight: 70,
        ancVisits: 0
      }
    ]);

    saveData('ancVisits', [
      {
        id: 1,
        patientId: 1,
        patientName: 'Sunita Devi',
        visitNumber: 1,
        visitDate: '2024-04-10',
        weeksPregnancy: 12,
        bpSystolic: 118,
        bpDiastolic: 76,
        weight: 56,
        hb: 10.2,
        urineProtein: false,
        urineSugar: false,
        ifaGiven: true,
        ttGiven: true,
        referred: false
      },
      {
        id: 2,
        patientId: 1,
        patientName: 'Sunita Devi',
        visitNumber: 2,
        visitDate: '2024-06-15',
        weeksPregnancy: 20,
        bpSystolic: 122,
        bpDiastolic: 80,
        weight: 58,
        hb: 10.8,
        urineProtein: false,
        urineSugar: false,
        ifaGiven: true,
        ttGiven: false,
        referred: false
      }
    ]);

    saveData('tbPatients', [
      {
        id: 1,
        name: 'Mohan Lal',
        age: 45,
        gender: 'Male',
        tbType: 'Pulmonary',
        testType: 'Sputum',
        nikshayId: 'NK-MP-2024-00891',
        enrollDate: '2024-07-01',
        regimen: 'Category I',
        dbtBank: 'SBI',
        dbtAccount: '****4521',
        adherence: 85
      }
    ]);

    saveData('households', []);
    saveData('syncQueue', []);
    saveData('initialized', true);
  }
};
