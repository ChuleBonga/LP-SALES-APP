import { Lead } from "./types";

const getPastDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
};

export const AGENTS = ['Ziggy', 'Nathan', 'Veda', 'Emily', 'Zoe'];

const RAW_DATA = [
  ["Earl", "Crawford", "Alameda County Juvenile Hall/Court", "(510) 670-7609", "ecrawford@acoe.org", "Yes called and spoke"],
  ["Monica", "Vaughan", "Alameda County Special Education", "(510) 723-3857", "mvaughan@acoe.org", "No answer"],
  ["Daniel", "Zarazua", "Alternatives in Action", "(510) 748-4314", "dzarazua@alternativesinaction.org", "No answer"],
  ["Donnell", "Thomas", "Aurum Preparatory Academy", "(510) 746-7862", "donnell.thomas@aurumprep.org", "Yes called and spoke"],
  ["Anayaxy", "Barraza", "Community School for Creative Education", "(510) 686-4131", "anayaxyb@communityschoolforcreativeeducation.org", "No answer"],
  ["Jerri", "Levers", "Connecting Waters Charter - East Bay", "(209) 874-1119", "jlevers@cwcharter.org", ""],
  ["Larissa", "Adam", "Cox Academy", "(510) 904-6300", "ladam@efcps.net", ""],
  ["Elizabeth", "Raji-Greg", "Envision Academy for Arts & Technology", "(510) 596-8901", "compliance@envisionschools.org", ""],
  ["Larissa", "Adam", "Epic Charter", "(510) 689-2035", "cbo@efcps.net", ""],
  ["Quincy", "Long", "Hayward Collegiate Charter", "(650) 520-3915", "quincy.long@navigatorschools.org", ""],
  ["Kaitlin", "Friedman", "Lazear Charter Academy", "(510) 689-2018", "cdelazear@efcps.net", ""],
  ["Sau-Lim", "Tsang", "Oakland Unity Middle", "(510) 564-4851", "stsang@unityhigh.org", ""],
  ["Tracey", "Burns", "Opportunity Academy", "(510) 670-7602", "tburns@acoe.org", ""],
  ["Krishna", "Feeney", "Urban Montessori Charter", "(510) 842-1181", "krishnaf@urbanmontessori.org", ""],
  ["Celia", "Pascual", "Yu Ming Charter", "(510) 452-2063", "cpascual@yumingschool.org", ""],
  ["Joy", "Chua", "Alameda Adult", "(510) 522-3858", "jchua@alamedaunified.org", ""],
  ["Annalisa", "Moore", "Alameda Community Learning Center", "(510) 995-4300", "annalisa.moore@clcschools.org", ""],
  ["Angela", "Barrett", "Alameda High", "(510) 337-7022", "abarrett@alamedaunified.org", ""],
  ["Tracy", "Corbally", "Alameda Science and Technology Institute", "(510) 748-4021", "tcorbally@alamedaunified.org", ""],
  ["Randhir", "Bains", "Alameda Unified Special Education", "(510) 337-7000", "rbains@alamedaunified.org", ""],
  ["Bryan", "Dunn-Ruiz", "Amelia Earhart Elementary", "(510) 748-4003", "bdunnruiz@alamedaunified.org", ""],
  ["Katherine", "Crawford", "Bay Farm", "(510) 748-4010", "kcrawford@alamedaunified.org", ""],
  ["Lisa", "Lovitt", "Coastline Christian Schools", "(510) 522-0200", "lisalovitt@ccs-rams.org", ""],
  ["Gregory", "Sahakian", "Edison Elementary", "(510) 748-4002", "gsahakian@alamedaunified.org", ""],
  ["Kirstin", "Snyder", "Encinal Junior/Senior High", "(510) 748-4023", "ksnyder@alamedaunified.org", ""],
  ["Monique", "Brinson", "EnCompass Four Corners School", "(510) 735-1501", "monique@encompass4corners.org", ""],
  ["Brian", "Dodson", "Frank Otis Elementary", "(510) 748-4013", "bdodson@alamedaunified.org", ""],
  ["Lynnette", "Chirrick", "Franklin Elementary", "(510) 748-4004", "lchirrick@alamedaunified.org", ""],
  ["Jorge", "Melgoza", "Island High (Continuation)", "(510) 748-4024", "jmelgoza@alamedaunified.org", ""],
  ["Sheila", "SatheWarner", "Lincoln Middle", "(510) 748-4018", "ssathewarner@alamedaunified.org", ""],
  ["Tina", "Lagdamen", "Love Elementary", "(510) 748-4005", "tlagdamen@alamedaunified.org", ""],
  ["Karen", "Ringewald", "Maya Lin", "(510) 748-4007", "kringewald@alamedaunified.org", ""],
  ["Juan", "Flores", "Ruby Bridges Elementary", "(510) 748-4006", "jflores@alamedaunified.org", ""],
  ["Steve", "Kim", "Saint Joseph Notre Dame High School", "(510) 523-1526", "skim@sjnd.org", ""],
  ["Danielle", "Colvert", "St. Joseph Elementary", "(510) 522-4456", "dcolvert@csdo.org", ""],
  ["Julie", "Thomas", "St. Philip Neri Elementary", "(510) 521-0787", "juthomas@csdo.org", ""],
  ["Christine", "Chilcott", "The Academy of Alameda", "(510) 748-4017", "cchilcott@aoaschools.org", ""],
  ["Cindy", "Acker", "The Child Unique Montessori School", "(510) 521-0595", "cindy.acker@thechildunique.org", ""],
  ["Allan", "Chatman", "The Phillips Academy", "(510) 769-7100", "achatman@thephillipsacademy.org", ""],
  ["Jessica", "Lucio", "Will C. Wood Middle", "(510) 748-4015", "jlucio@alamedaunified.org", ""],
  ["Tri", "Nguyen", "William G. Paden Elementary", "(510) 748-4014", "tringuyen@alamedaunified.org", ""],
  ["Darren", "McNally", "Albany High", "(510) 558-2500", "dmcnally@ausdk12.org", ""],
  ["Eric", "Mapes", "Albany Middle", "(510) 558-3600", "emapes@ausdk12.org", ""],
  ["Catherine", "Floresca", "Cornell Elementary", "(510) 558-3700", "cfloresca@ausdk12.org", ""],
  ["Melisa", "Pfohl", "Marin Elementary", "(510) 559-4700", "mpfohl@ausdk12.org", ""],
  ["Ana", "Delgado", "Ocean View Elementary", "(510) 558-4800", "adelgado@ausdk12.org", ""],
  ["Laurie", "Kumar", "Tilden Preparatory School", "(510) 525-5506", "lauriek@tildenprep.com", ""],
  ["Ernest", "Mahr", "American International Montessori School", "(510) 868-1815", "office@AIMmontessori.com", ""],
  ["Donna", "Austin", "Bayhill High", "(510) 984-0599", "austin@bayhillhs.org", ""],
  ["Thomas", "Reid", "Berkeley Adult", "(510) 644-6130", "thomasreid@berkeley.net", ""],
  ["Rene", "Molina", "Berkeley Arts Magnet at Whittier", "(510) 644-6225", "renemolina@berkeley.net", ""],
  ["Juan", "Raygoza", "Berkeley High", "(510) 644-6120", "juanraygoza@berkeley.net", ""],
  ["Heidi", "Weber", "Berkeley Independent Study K-8", "(510) 644-6159", "heidiweber@berkeley.net", ""],
  ["Rachael", "Flug", "Berkeley Rose Waldorf School", "(510) 859-7679", "rachael@berkeleyrose.org", ""],
  ["Shawn", "Mansager", "Berkeley Special Education Preschool", "(510) 644-6120", "shawnmansager@berkeley.net", ""],
  ["Kris", "Jachens", "Berkwood Hedge School", "(510) 883-6990", "operations@berkwood.org", ""],
  ["DeAndre", "Calhoun", "Black Pine Circle", "(510) 845-0876", "support@blackpinecircle.org", ""],
  ["Cindy", "Dickeson", "Center for Early Intervention on Deafness", "(510) 848-4800", "Cindy@CEID.org", ""],
  ["Candyce", "Cannon", "Cragmont Elementary", "(510) 644-8810", "candycecannon@berkeley.net", ""],
  ["Sebastien", "Robert", "Ecole Bilingue De Berkeley", "(510) 809-0602", "srobert@eb.org", ""],
  ["Jana", "Holmes", "Emerson Elementary", "(510) 644-6890", "janaholmes@berkeley.net", ""],
  ["Daniel", "Wright", "Fusion Academy Berkeley", "(510) 292-4104", "dwright@fusionacademy.com", ""],
  ["Jeremy", "Furlan", "John Muir Elementary", "(510) 644-6410", "jeremyfurlan@berkeley.net", ""],
  ["Salita", "Mitchell", "Longfellow Arts and Technology Middle", "(510) 644-6360", "salitamitchell@berkeley.net", ""],
  ["Alex", "Hunt", "Malcolm X Elementary", "(510) 644-6313", "alexhunt@berkeley.net", ""],
  ["Michael", "Tison Yee", "Martin Luther King Middle", "(510) 644-6280", "michaeltisonyee@berkeley.net", ""],
  ["Marcella", "Wasson", "MarWell", "510-555-0199", "marwellmethod@gmail.com", ""],
  ["Anne", "Crowley", "Maybeck High School", "(510) 841-8489", "annec@maybeckhs.org", ""],
  ["John", "Muster", "Mentoring Academy", "(510) 345-3000", "JohnMuster@MentoringAcademy.org", ""],
  ["Elizabeth", "Cornwell", "Oxford Elementary at West Campus", "(510) 644-6300", "elizabethcornwell@berkeley.net", ""],
  ["Susanne", "Reed", "Rosa Parks Environmental Science", "(510) 644-8812", "susannereed@berkeley.net", ""],
  ["Mary", "Cazden", "Ruth Acty Elementary", "(510) 644-6298", "marycazden@berkeley.net", ""],
  ["Peter", "Imperial", "Saint Mary's College High School", "(510) 526-9242", "pimperial@stmchs.org", ""],
  ["Joseph", "Nagel", "School of the Madeleine", "(510) 526-4744", "jnagel@csdo.org", ""],
  ["Maria", "Carriedo", "Sylvia Mendez Elementary", "(510) 644-6290", "mariacarriedo@berkeley.net", ""],
  ["Celeste", "Penney", "The Academy", "(510) 549-0605", "cpenney@theacademyschool.org", ""],
  ["Elise", "Wilks", "The Berkeley School", "(510) 665-8800", "ewilks@theberkeleyschool.org", ""],
  ["Dan", "Meyers", "The Crowden School", "(510) 559-6910", "dmeyers@crowden.org", ""],
  ["Gabriel", "Fredman", "Thousand Oaks Elementary", "(510) 644-6368", "gabrielfredman@berkeley.net", ""],
  ["Angela", "McGee", "Via Center", "(510) 848-1616", "angelamcgee5@gmail.com", ""],
  ["Joshua", "Heideman", "Washington Elementary", "(510) 644-6310", "joshuaheideman@berkeley.net", ""],
  ["Alexander", "Billotte", "Willard Middle", "(510) 644-6330", "alexanderbillotte@berkeley.net", ""],
  ["Shannon", "Johns", "California School for the Blind", "(510) 794-3800", "sjohns@csb-cde.ca.gov", ""],
  ["Sulghi", "Hong", "California School for the Deaf-Fremont", "(510) 794-3666", "shong@csdf-cde.ca.gov", ""],
  ["Steven", "Hendee", "Canyon Middle", "(510) 538-8833", "shendee@cv.k12.ca.us", ""],
  ["Beth", "Cutter", "Castro Valley Adult and Career Education", "(510) 886-1000", "bcutter@cv.k12.ca.us", ""],
  ["Elizabeth", "Contreras", "Castro Valley Elementary", "(510) 537-1919", "econtreras@cv.k12.ca.us", ""],
  ["Christopher", "Fortenberry", "Castro Valley High", "(510) 537-5910", "cfortenberry@cv.k12.ca.us", ""],
  ["Kenneth", "Kahn", "Castro Valley Virtual Academy", "(510) 537-3193", "kkahn@cv.k12.ca.us", ""],
  ["Delnaz", "Hosseini", "Chabot Elementary", "(510) 537-2342", "dhosseini@cv.k12.ca.us", ""],
  ["Susan", "Shih", "Creekside Middle", "(510) 247-0665", "sshih@cv.k12.ca.us", ""],
  ["Patrick", "Hansen-Schmitt", "Independent Elementary", "(510) 537-9558", "phansenschmitt@cv.k12.ca.us", ""],
  ["Lisa", "MacLean", "Jensen Ranch Elementary", "(510) 537-6365", "lgarcia@cv.k12.ca.us", ""],
  ["Mistee", "Guzman", "Marshall Elementary", "(510) 537-2431", "mguzman@cv.k12.ca.us", ""],
  ["Kelle", "Patrick", "OneSchool Global - San Francisco", "(510) 247-9235", "jacqueline.holt@na.oneschoolglobal.com", ""],
  ["Gena", "McGowan", "Our Lady of Grace School", "(510) 581-3155", "gmcgowan@csdo.org", ""],
  ["Bradley", "Frazier", "San Leandro Adult and Career Education Center", "(510) 618-4420", "bfrazier@slusd.us", ""],
  ["Maite", "Barloga", "San Leandro High", "(510) 618-4600", "mbarloga@slusd.us", ""],
  ["Matthew", "Steinecke", "San Leandro Virtual Academy", "(510) 618-4460", "msteinecke@slusd.us", ""],
  ["Amy", "Cross", "St. Leander", "(510) 351-4144", "across@csdo.org", ""],
  ["Monica", "Manriquez", "Washington Elementary", "(510) 618-4360", "mmanriquez@slusd.us", ""]
];

// Generate initial leads from raw data with cyclic assignment
export const INITIAL_LEADS: Lead[] = RAW_DATA.map((row, index) => {
  const [firstName, lastName, company, phone, email, notes] = row;
  
  // Determine status based on CSV note or random for variety if empty
  let status: Lead['status'] = 'New';
  if (notes.toLowerCase().includes("yes called")) status = 'In Progress';
  else if (notes.toLowerCase().includes("no answer")) status = 'Follow Up';
  else if (index % 15 === 0) status = 'Closed';
  else if (index % 7 === 0) status = 'Lost';

  // Last contact simulation
  let lastContact = null;
  if (status === 'In Progress') lastContact = getPastDate(0);
  if (status === 'Follow Up') lastContact = getPastDate(2);
  if (status === 'Closed') lastContact = getPastDate(10);

  return {
    id: index + 1,
    firstName,
    lastName,
    company,
    phone,
    email,
    status,
    notes: notes ? `CSV Import: ${notes}` : '',
    lastContact,
    timezone: 'PST',
    officeHours: '8:30 AM - 4:30 PM',
    assignedAgent: AGENTS[index % AGENTS.length] // Round-robin distribution
  };
});
