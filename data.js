// Bütün sxem məlumatı burada. Dəyişdirmək üçün yalnız bu faylı redaktə et.
const PARTS=[
 {x:30,y:60,w:120,h:150,t:'J1 · MQ-4',pins:[[150,90,'1 VCC','r'],[150,120,'2 GND','r'],[150,150,'3 DO (boş)','r'],[150,180,'4 AO','r']]},
 {x:380,y:40,w:140,h:440,t:'U1 · NodeMCU 12F',pins:[[380,100,'2 ADC','l'],[380,380,'14 GND','l'],[380,410,'15 5V','l'],[520,200,'23 IO14 (D5)','r'],[520,380,'17 GND','r'],[520,410,'16 3.3V','r']]},
 {x:750,y:140,w:120,h:120,t:'H1 · DHT22',pins:[[750,170,'1 3V3','l'],[750,200,'2 DATA','l'],[750,230,'3 GND','l']]}
];
const NETS=[
 {id:'5V',c:'#d62828',d:'MQ-4 qızdırıcısının qidası',links:['J1 pin 1 → U1 pin 15 (5V / VIN)'],w:[[[150,90],[340,90],[340,410],[380,410]]]},
 {id:'GND',c:'#2b2d42',d:'Ümumi torpaq (hamısı bir net)',links:['J1 pin 2 → U1 pin 14','R2 aşağı ucu → U1 pin 14','H1 pin 3 → U1 pin 17'],w:[[[150,120],[320,120],[320,380],[380,380]],[[300,290],[300,380],[320,380]],[[520,380],[725,380],[725,230],[750,230]]],dots:[[320,380]]},
 {id:'AO',c:'#7b2cbf',d:'MQ-4 analoq çıxışı (0–5V)',links:['J1 pin 4 → R1 sol ucu'],w:[[[150,180],[200,180]]]},
 {id:'ADC',c:'#0077b6',d:'Bölücünün orta nöqtəsi → A0',links:['R1 sağ ucu + R2 yuxarı ucu → U1 pin 2 (ADC)'],w:[[[260,180],[360,180],[360,100],[380,100]],[[300,180],[300,230]]],dots:[[300,180]]},
 {id:'3V3',c:'#f08c00',d:'DHT22 qidası',links:['U1 pin 16 (3.3V) → H1 pin 1'],w:[[[520,410],[700,410],[700,170],[750,170]]]},
 {id:'DATA',c:'#2a9d8f',d:'DHT22 məlumat xətti',links:['H1 pin 2 → U1 pin 23 (IO14 / D5)'],w:[[[520,200],[750,200]]]}
];
const CHECK=[
 'NodeMCU footprint-də iki pin cərgəsi arası məsafəni real lövhə ilə kumpasla müqayisə et',
 'Real lövhədə A0 pininin yuxarıdan neçənci olduğunu yoxla (footprint-də 2-ci pindir)',
 'H1 pin 2 (DATA) həqiqətən IO14 / pin 23-ə gedir (ratsnest-də təsdiqlə)',
 'R2-ni 15k–18k et (20k ilə AO 5V olsa A0-a 3,33V düşür)',
 'ADC orta nöqtəsi ilə GND arasına 100nF (C1) qoy, ADC pininə yaxın',
 '5V/GND arasına 100µF + 100nF (C2, C3) qoy, J1-ə yaxın',
 'DHT22 DATA ilə 3V3 arasında 10k pull-up (R3) üçün yer saxla (DNP)',
 'DHT22 modulunun pin sırasını (VCC/DATA/GND) real modulda yoxla',
 'U1 antenasının altında və yanında mis, iz və komponent olmasın',
 '5V və 3V3 trace-ləri ≥0,5 mm, siqnal trace-ləri 0,25–0,3 mm',
 'Alt qatda GND pour (Copper Area) çək',
 'J1 və H1 lövhənin əks kənarlarında olsun (MQ-4 qızır, DHT22-yə təsir etməsin)',
 'USB tərəfi əlçatan qalsın, 4 ədəd M3 montaj deşiyi əlavə et',
 'DRC çalışdır, xətasız olsun, sonra Gerber çıxar'
];
const BOM=[
 ['U1','NodeMCU 12F (Ai-Thinker), LCSC C2764098','1'],
 ['J1','1x4 başlıq 2,54 mm (MQ-4)','1'],
 ['H1','1x3 başlıq 2,54 mm (DHT22)','1'],
 ['R1','10 kΩ','1'],
 ['R2','20 kΩ (tövsiyə: 15–18 kΩ)','1'],
 ['C1','100 nF (tövsiyə, sxemdə yoxdur)','1'],
 ['C2','100 µF elektrolit (tövsiyə)','1'],
 ['C3','100 nF (tövsiyə)','1'],
 ['R3','10 kΩ pull-up, DNP (tövsiyə)','1']
];
