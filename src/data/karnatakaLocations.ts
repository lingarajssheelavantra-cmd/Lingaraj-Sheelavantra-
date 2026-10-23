export interface DistrictData {
  district: string;
  kannadaDistrict: string;
  lat: number;
  lon: number;
  taluks: string[];
  mandis: string[];
}

export interface StateData {
  state: string;
  kannadaState: string;
  districts: DistrictData[];
}

export const INDIAN_LOCATIONS: StateData[] = [
  {
    state: 'Karnataka',
    kannadaState: 'ಕರ್ನಾಟಕ',
    districts: [
      {
        district: 'Mandya',
        kannadaDistrict: 'ಮಂಡ್ಯ',
        lat: 12.5229,
        lon: 76.8976,
        taluks: ['Mandya', 'Maddur', 'Pandavapura', 'Malavalli', 'Nagamangala', 'K.R. Pete', 'Srirangapatna'],
        mandis: ['Mandya APMC', 'Maddur APMC', 'Pandavapura APMC'],
      },
      {
        district: 'Kolar',
        kannadaDistrict: 'ಕೋಲಾರ',
        lat: 13.1378,
        lon: 78.1292,
        taluks: ['Kolar', 'Bangarapet', 'Malur', 'Mulbagal', 'Srinivaspur'],
        mandis: ['Kolar APMC (Tomato Market)', 'Srinivaspur APMC (Mango/Fruit Market)', 'Malur APMC'],
      },
      {
        district: 'Dharwad',
        kannadaDistrict: 'ಧಾರವಾಡ',
        lat: 15.4589,
        lon: 75.0078,
        taluks: ['Hubballi (Hubli)', 'Dharwad', 'Kalghatgi', 'Navalgund', 'Kundgol'],
        mandis: ['Hubballi APMC (Amargol)', 'Dharwad APMC', 'Navalgund APMC'],
      },
      {
        district: 'Belagavi',
        kannadaDistrict: 'ಬೆಳಗಾವಿ',
        lat: 15.8497,
        lon: 74.4977,
        taluks: ['Belagavi', 'Gokak', 'Bailhongal', 'Chikkodi', 'Athani', 'Hukkeri', 'Ramdurg', 'Saundatti'],
        mandis: ['Belagavi APMC', 'Bailhongal APMC', 'Gokak APMC', 'Chikkodi APMC'],
      },
      {
        district: 'Haveri',
        kannadaDistrict: 'ಹಾವೇರಿ',
        lat: 14.7954,
        lon: 75.4024,
        taluks: ['Byadgi', 'Haveri', 'Ranebennur', 'Hirekerur', 'Shiggaon', 'Savanur', 'Hangal'],
        mandis: ['Byadgi APMC (Famous Chilli Market)', 'Ranebennur APMC', 'Haveri APMC'],
      },
      {
        district: 'Shivamogga',
        kannadaDistrict: 'ಶಿವಮೊಗ್ಗ',
        lat: 13.9299,
        lon: 75.5681,
        taluks: ['Shivamogga', 'Bhadravathi', 'Thirthahalli', 'Sagara', 'Shikaripura', 'Soraba', 'Hosanagara'],
        mandis: ['Shivamogga APMC', 'Sagara APMC (Arecanut)', 'Shikaripura APMC'],
      },
      {
        district: 'Mysuru',
        kannadaDistrict: 'ಮೈಸೂರು',
        lat: 12.2958,
        lon: 76.6394,
        taluks: ['Mysuru', 'Nanjangud', 'Hunsur', 'T. Narasipura', 'H.D. Kote', 'K.R. Nagar', 'Periyapatna'],
        mandis: ['Mysuru Bandipalya APMC', 'Nanjangud APMC', 'Hunsur APMC'],
      },
      {
        district: 'Hassan',
        kannadaDistrict: 'ಹಾಸನ',
        lat: 13.0033,
        lon: 76.1004,
        taluks: ['Hassan', 'Arsikere', 'Channarayapatna', 'Belur', 'Alur', 'Sakleshpur', 'Holenarasipura', 'Arkalgud'],
        mandis: ['Hassan APMC (Potato & Grain)', 'Arsikere APMC (Coconut)', 'Channarayapatna APMC'],
      },
      {
        district: 'Davanagere',
        kannadaDistrict: 'ದಾವಣಗೆರೆ',
        lat: 14.4644,
        lon: 75.9218,
        taluks: ['Davanagere', 'Harihara', 'Honnali', 'Channagiri', 'Jagalur', 'Harapanahalli'],
        mandis: ['Davanagere APMC', 'Harihara APMC', 'Channagiri APMC'],
      },
      {
        district: 'Raichur',
        kannadaDistrict: 'ರಾಯಚೂರು',
        lat: 16.212,
        lon: 77.3439,
        taluks: ['Raichur', 'Sindhanur', 'Manvi', 'Devadurga', 'Lingsugur', 'Maski', 'Sirwar'],
        mandis: ['Raichur APMC (Cotton & Paddy Hub)', 'Sindhanur APMC (Paddy Bowl)'],
      },
      {
        district: 'Gadag',
        kannadaDistrict: 'ಗದಗ',
        lat: 15.4319,
        lon: 75.6355,
        taluks: ['Gadag', 'Ron', 'Shirahatti', 'Mundargi', 'Nargund'],
        mandis: ['Gadag APMC (Onion & Chilli Hub)', 'Nargund APMC'],
      },
      {
        district: 'Kalaburagi',
        kannadaDistrict: 'ಕಲಬುರಗಿ',
        lat: 17.3297,
        lon: 76.8343,
        taluks: ['Kalaburagi', 'Aland', 'Afzalpur', 'Jevargi', 'Sedam', 'Chittapur', 'Chincholi'],
        mandis: ['Kalaburagi APMC (Tur / Red Gram Capital)', 'Sedam APMC'],
      },
      {
        district: 'Vijayapura',
        kannadaDistrict: 'ವಿಜಯಪುರ',
        lat: 16.8302,
        lon: 75.7100,
        taluks: ['Vijayapura', 'Indi', 'Sindgi', 'Muddebihal', 'Basavana Bagewadi'],
        mandis: ['Vijayapura APMC (Grapes, Lime & Grain)', 'Indi APMC'],
      },
      {
        district: 'Tumakuru',
        kannadaDistrict: 'ತುಮಕೂರು',
        lat: 13.3392,
        lon: 77.1015,
        taluks: ['Tumakuru', 'Tiptur', 'Sira', 'Madhugiri', 'Pavagada', 'Kunigal', 'Gubbi', 'Turuvekere'],
        mandis: ['Tiptur APMC (Copra Capital)', 'Tumakuru APMC', 'Sira APMC'],
      },
      {
        district: 'Bengaluru Rural',
        kannadaDistrict: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
        lat: 13.2384,
        lon: 77.5855,
        taluks: ['Nelamangala', 'Devanahalli', 'Doddaballapura', 'Hosakote'],
        mandis: ['Nelamangala APMC', 'Doddaballapura APMC', 'Hosakote APMC'],
      },
    ],
  },
  {
    state: 'Maharashtra',
    kannadaState: 'ಮಹಾರಾಷ್ಟ್ರ',
    districts: [
      {
        district: 'Nashik',
        kannadaDistrict: 'ನಾಸಿಕ್',
        lat: 19.9975,
        lon: 73.7898,
        taluks: ['Nashik', 'Niphad', 'Lasalgaon', 'Sinnar', 'Dindori'],
        mandis: ['Lasalgaon APMC (Asia Onion Hub)', 'Nashik APMC', 'Pimpalgaon APMC'],
      },
      {
        district: 'Pune',
        kannadaDistrict: 'ಪುಣೆ',
        lat: 18.5204,
        lon: 73.8567,
        taluks: ['Haveli', 'Baramati', 'Shirur', 'Junner', 'Indapur'],
        mandis: ['Pune Gultekdi APMC', 'Baramati APMC', 'Narayangaon APMC'],
      },
    ],
  },
  {
    state: 'Tamil Nadu',
    kannadaState: 'ತಮಿಳುನಾಡು',
    districts: [
      {
        district: 'Coimbatore',
        kannadaDistrict: 'ಕೊಯಮತ್ತೂರು',
        lat: 11.0168,
        lon: 76.9558,
        taluks: ['Coimbatore South', 'Pollachi', 'Sulur', 'Mettupalayam'],
        mandis: ['Pollachi APMC (Coconut)', 'Coimbatore APMC', 'Mettupalayam APMC'],
      },
    ],
  },
  {
    state: 'Andhra Pradesh',
    kannadaState: 'ಆಂಧ್ರಪ್ರದೇಶ',
    districts: [
      {
        district: 'Guntur',
        kannadaDistrict: 'ಗುಂಟೂರು',
        lat: 16.3067,
        lon: 80.4365,
        taluks: ['Guntur', 'Tenali', 'Mangalagiri', 'Ponnur'],
        mandis: ['Guntur Mirchi Yard (Asia Red Chilli Hub)', 'Tenali APMC'],
      },
    ],
  },
];
