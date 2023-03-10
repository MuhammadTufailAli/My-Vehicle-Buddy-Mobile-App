import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Font, Commonstyles} from '../font/Font';
import port from '../Port/Port';

const SelectCity = ({navigation, route}) => {
  const [PopularCities, setPopularCity] = useState([
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Peshawar',
  ]);
  const [PopularCitiesToShow, setPopularCityToShow] = useState([
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Peshawar',
  ]);
  const [OtherCities, setOtherCities] = useState([
    'Abdul Hakeem',
    'Adda jahan khan',
    'Adda shaiwala',
    'Ahmed Pur East',
    'Ahmedpur Lamma',
    'Akora khattak',
    'Ali chak',
    'Alipur Chatta',
    'Allahabad',
    'Amangarh',
    'Arifwala',
    'Attock',
    'Babarloi',
    'Babri banda',
    'Badin',
    'Bahawalnagar',
    'Bahawalpur',
    'Balakot',
    'Bannu',
    'Baroute',
    'Basirpur',
    'Basti Shorekot',
    'Bat khela',
    'Batang',
    'Bhai pheru',
    'Bhakkar',
    'Bhalwal',
    'Bhan saeedabad',
    'Bhera',
    'Bhikky',
    'Bhimber',
    'Bhirya road',
    'Bhuawana',
    'Buchay key',
    'Buner',
    'Burewala',
    'Chaininda',
    'Chak 4 b c',
    'Chak 46',
    'Chak jamal',
    'Chak jhumra',
    'Chak Shahzad',
    'Chaklala',
    'Chaksawari',
    'Chakwal',
    'Charsadda',
    'Chashma',
    'Chawinda',
    'Chenab Nagar',
    'Chichawatni',
    'Chiniot',
    'Chishtian',
    'Chitral',
    'Chohar jamali',
    'Choppar hatta',
    'Chowha saidan shah',
    'Chowk azam',
    'Chowk mailta',
    'Chowk munda',
    'Chunian',
    'D.G.Khan',
    'Dadakhel',
    'Dadu',
    'Dadyal Ak',
    'Daharki',
    'Dandot',
    'Dargai',
    'Darya khan',
    'Daska',
    'Daud khel',
    'Daulatpur',
    'Deh pathan',
    'Depal pur',
    'Dera Allah Yar',
    'Dera ismail khan',
    'Dera murad jamali',
    'Dera nawab sahib',
    'Dhatmal',
    'Dhoun kal',
    'Digri',
    'Dijkot',
    'Dina',
    'Dinga',
    'Dir',
    'Doaba',
    'Doltala',
    'Domeli',
    'Donga Bonga',
    'Dudial',
    'Dunia Pur',
    'Eminabad',
    'Esa Khel',
    'Faisalabad',
    'Faqirwali',
    'Farooqabad',
    'Fateh Jang',
    'Fateh pur',
    'Feroz walla',
    'Feroz watan',
    'Feroz Watwan',
    'Fiza got',
    'Fort Abbass',
    'Gadoon amazai',
    'Gaggo mandi',
    'Gakhar mandi',
    'Gambat',
    'Gambet',
    'Garh maharaja',
    'Garh more',
    'Garhi yaseen',
    'Gari habibullah',
    'Gari mori',
    'Gharo',
    'Ghazi',
    'Ghotki',
    'Gilgit',
    'Gohar ghoushti',
    'Gojra',
    'Goth Machi',
    'Goular khel',
    'Guddu',
    'Gujar khan',
    'Gujar Khan',
    'Gujranwala',
    'Abbottabad',
    'Gujrat',
    'Gwadar',
    'Hafizabad',
    'Hala',
    'Hangu',
    'Harappa',
    'Haripur',
    'Hariwala',
    'Haroonabad',
    'Hasilpur',
    'Hassan abdal',
    'Hattar',
    'Hattian',
    'Hattian lawrencepur',
    'Havali Lakhan',
    'Hawilian',
    'Hayatabad',
    'Hazro',
    'Head marala',
    'Hub',
    'Hub-Balochistan',
    'Hujra Shah Mukeem',
    'Hunza',
    'Hyderabad',
    'Iskandarabad',
    'Jacobabad',
    'Jahaniya',
    'Jaja abasian',
    'Jalalpur Jattan',
    'Jalalpur Pirwala',
    'Jampur',
    'Jamrud road',
    'Jamshoro',
    'Jan pur',
    'Jand',
    'Jandanwala',
    'Jaranwala',
    'Jatlaan',
    'Jatoi',
    'Jauharabad',
    'Jehangira',
    'Jhal Magsi',
    'Jhand',
    'Jhang',
    'Jhatta bhutta',
    'Jhelum',
    'Jhudo',
    'Jin Pur',
    'K.N. Shah',
    'Kabirwala',
    'Kacha khooh',
    'Kahuta',
    'Kakul',
    'Kakur town',
    'Kala bagh',
    'Kala shah kaku',
    'Kalaswala',
    'Kallar Kahar',
    'Kallar Saddiyian',
    'Kallur kot',
    'Kamalia',
    'Kamalia musa',
    'Kamber ali khan',
    'Kameer',
    'Kamoke',
    'Kamra',
    'Kandh kot',
    'Kandiaro',
    'Karak',
    'Karoor pacca',
    'Karore lalisan',
    'Kashmir',
    'Kashmore',
    'Kasur',
    'Kazi ahmed',
    'Khairpur',
    'Khairpur Mir',
    'Khan Bela',
    'Khan qah sharif',
    'Khandabad',
    'Khanewal',
    'Khangarh',
    'Khanpur',
    'Khanqah dogran',
    'Khanqah sharif',
    'Kharian',
    'Khewra',
    'Khoski',
    'Khudian Khas',
    'Khurian wala',
    'Khurrianwala',
    'Khushab',
    'Khushal kot',
    'Khuzdar',
    'Khyber',
    'Klaske',
    'Kohat',
    'Kot addu',
    'Kot bunglow',
    'Kot ghulam mohd',
    'Kot mithan',
    'Kot Momin',
    'Kot radha kishan',
    'Kotla',
    'Kotla arab ali khan',
    'Kotla jam',
    'Kotla Pathan',
    'Kotli Ak',
    'Kotli Loharan',
    'Kotri',
    'Kumbh',
    'Kundina',
    'Kunjah',
    'Kunri',
    'Lakki marwat',
    'Lala musa',
    'Lala rukh',
    'Laliah',
    'Lalshanra',
    'Larkana',
    'Lasbela',
    'Lawrence pur',
    'Layyah',
    'Liaqat Pur',
    'Lodhran',
    'Lower Dir',
    'Ludhan',
    'Makli',
    'Malakand Agency',
    'Malakwal',
    'Mamu kunjan',
    'Mandi bahauddin',
    'Mandra',
    'Manga mandi',
    'Mangal sada',
    'Mangi',
    'Mangla',
    'Mangowal',
    'Manoabad',
    'Mansehra',
    'Mardan',
    'Mari indus',
    'Mastoi',
    'Matli',
    'Mehar',
    'Mehmood kot',
    'Mehrabpur',
    'Melsi',
    'Mian Channu',
    'Mian Wali',
    'Minchanabad',
    'Mingora',
    'Mir ali',
    'Miran shah',
    'Mirpur A.K.',
    'Mirpur khas',
    'Mirpur mathelo',
    'Mithi',
    'Mitiari',
    'Mohen jo daro',
    'More kunda',
    'Morgah',
    'Moro',
    'Mubarik pur',
    'Multan',
    'Muridke',
    'Murree',
    'Musafir khana',
    'Mustung',
    'Muzaffar Gargh',
    'Muzaffarabad',
    'Nankana sahib',
    'Narang mandi',
    'Narowal',
    'Naseerabad',
    'Naukot',
    'Naukundi',
    'Nawabshah',
    'New saeedabad',
    'Nilore',
    'Noor kot',
    'Nooriabad',
    'Noorpur nooranga',
    'Noshero Feroze',
    'Noudero',
    'Nowshera',
    'Nowshera cantt',
    'Nowshera Virka',
    'Okara',
    'Other',
    'Padidan',
    'Pak china fertilizer',
    'Pak pattan sharif',
    'Panjan kisan',
    'Panjgoor',
    'Pano Aqil',
    'Pano Aqil',
    'Pasni',
    'Pasrur',
    'Pattoki',
    'Phagwar',
    'Phalia',
    'Phool nagar',
    'Piaro goth',
    'Pind Dadan Khan',
    'Pindi Bhattian',
    'Pindi bohri',
    'Pindi gheb',
    'Piplan',
    'Pir mahal',
    'Pishin',
    'Qalandarabad',
    'Qamber Ali Khan',
    'Qasba gujrat',
    'Qazi ahmed',
    'Qila Deedar Singh',
    'Quaid Abad',
    'Quetta',
    'Rahim Yar Khan',
    'Rahwali',
    'Raiwind',
    'Rajana',
    'Rajanpur',
    'Rangoo',
    'Ranipur',
    'Rato Dero',
    'Rawalakot',
    'Rawat',
    'Renala khurd',
    'Risalpur',
    'Rohri',
    'Sadiqabad',
    'Sagri',
    'Sahiwal',
    'Saidu sharif',
    'Sajawal',
    'Sakhi Sarwar',
    'Samanabad',
    'Sambrial',
    'Samma satta',
    'Sanghar',
    'Sanghi',
    'Sangla Hills',
    'Sangote',
    'Sanjarpur',
    'Sanjwal',
    'Sara e naurang',
    'Sara-E-Alamgir',
    'Sarai alamgir',
    'Sargodha',
    'Satiana',
    'Sehar baqlas',
    'Sehwan Sharif',
    'Sekhat',
    'Shadiwal',
    'Shah kot',
    'Shahdad kot',
    'Shahdadpur',
    'Shahdara',
    'Shahpur chakar',
    'Shahpur Saddar',
    'Shakargarh',
    'Shamsabad',
    'Shankiari',
    'Shedani sharif',
    'Sheikhupura',
    'Sheikhupura',
    'Shemier',
    'Shikar pur',
    'Shorkot',
    'Shorkot Cantt',
    'Shuja Abad',
    'Sialkot',
    'Sibi',
    'Sihala',
    'Sikandarabad',
    'Sillanwali',
    'Sita road',
    'Skardu',
    'Skrand',
    'Sohawa',
    'Sohawa district daska',
    'Sukkur',
    'Sumandari',
    'Swabi',
    'Swat',
    'Swatmingora',
    'Takhtbai',
    'Talagang',
    'Talamba',
    'Talhur',
    'Tandiliyawala',
    'Tando adam',
    'Tando Allah Yar',
    'Tando jam',
    'Tando Muhammad Khan',
    'Tank',
    'Tarbela',
    'Tarmatan',
    'Tatlay Wali',
    'Taunsa sharif',
    'Taxila',
    'Tharo shah',
    'Thatta',
    'Theing jattan more',
    'Thull',
    'Tibba sultanpur',
    'Toba Tek Singh',
    'Topi',
    'Toru',
    'Tranda Muhammad Pannah',
    'Turbat',
    'Ubaro',
    'Ubauro',
    'Ugoke',
    'Ukba',
    'Umer Kot',
    'Upper deval',
    'Usta Muhammad',
    'Vehari',
    'Village Sunder',
    'Wah cantt',
    'Wahi hassain',
    'Wahn Bachran',
    'Wan radha ram',
    'Warah',
    'Warburton',
    'Wazirabad',
    'Yazman mandi',
    'Zafarwal',
    'Zahir Peer',
  ]);
  const [OtherCitiesToShow, setOtherCitiesToShow] = useState([
    'Abdul Hakeem',
    'Adda jahan khan',
    'Adda shaiwala',
    'Ahmed Pur East',
    'Ahmedpur Lamma',
    'Akora khattak',
    'Ali chak',
    'Alipur Chatta',
    'Allahabad',
    'Amangarh',
    'Arifwala',
    'Attock',
    'Babarloi',
    'Babri banda',
    'Badin',
    'Bahawalnagar',
    'Bahawalpur',
    'Balakot',
    'Bannu',
    'Baroute',
    'Basirpur',
    'Basti Shorekot',
    'Bat khela',
    'Batang',
    'Bhai pheru',
    'Bhakkar',
    'Bhalwal',
    'Bhan saeedabad',
    'Bhera',
    'Bhikky',
    'Bhimber',
    'Bhirya road',
    'Bhuawana',
    'Buchay key',
    'Buner',
    'Burewala',
    'Chaininda',
    'Chak 4 b c',
    'Chak 46',
    'Chak jamal',
    'Chak jhumra',
    'Chak Shahzad',
    'Chaklala',
    'Chaksawari',
    'Chakwal',
    'Charsadda',
    'Chashma',
    'Chawinda',
    'Chenab Nagar',
    'Chichawatni',
    'Chiniot',
    'Chishtian',
    'Chitral',
    'Chohar jamali',
    'Choppar hatta',
    'Chowha saidan shah',
    'Chowk azam',
    'Chowk mailta',
    'Chowk munda',
    'Chunian',
    'D.G.Khan',
    'Dadakhel',
    'Dadu',
    'Dadyal Ak',
    'Daharki',
    'Dandot',
    'Dargai',
    'Darya khan',
    'Daska',
    'Daud khel',
    'Daulatpur',
    'Deh pathan',
    'Depal pur',
    'Dera Allah Yar',
    'Dera ismail khan',
    'Dera murad jamali',
    'Dera nawab sahib',
    'Dhatmal',
    'Dhoun kal',
    'Digri',
    'Dijkot',
    'Dina',
    'Dinga',
    'Dir',
    'Doaba',
    'Doltala',
    'Domeli',
    'Donga Bonga',
    'Dudial',
    'Dunia Pur',
    'Eminabad',
    'Esa Khel',
    'Faisalabad',
    'Faqirwali',
    'Farooqabad',
    'Fateh Jang',
    'Fateh pur',
    'Feroz walla',
    'Feroz watan',
    'Feroz Watwan',
    'Fiza got',
    'Fort Abbass',
    'Gadoon amazai',
    'Gaggo mandi',
    'Gakhar mandi',
    'Gambat',
    'Gambet',
    'Garh maharaja',
    'Garh more',
    'Garhi yaseen',
    'Gari habibullah',
    'Gari mori',
    'Gharo',
    'Ghazi',
    'Ghotki',
    'Gilgit',
    'Gohar ghoushti',
    'Gojra',
    'Goth Machi',
    'Goular khel',
    'Guddu',
    'Gujar khan',
    'Gujar Khan',
    'Gujranwala',
    'Abbottabad',
    'Gujrat',
    'Gwadar',
    'Hafizabad',
    'Hala',
    'Hangu',
    'Harappa',
    'Haripur',
    'Hariwala',
    'Haroonabad',
    'Hasilpur',
    'Hassan abdal',
    'Hattar',
    'Hattian',
    'Hattian lawrencepur',
    'Havali Lakhan',
    'Hawilian',
    'Hayatabad',
    'Hazro',
    'Head marala',
    'Hub',
    'Hub-Balochistan',
    'Hujra Shah Mukeem',
    'Hunza',
    'Hyderabad',
    'Iskandarabad',
    'Jacobabad',
    'Jahaniya',
    'Jaja abasian',
    'Jalalpur Jattan',
    'Jalalpur Pirwala',
    'Jampur',
    'Jamrud road',
    'Jamshoro',
    'Jan pur',
    'Jand',
    'Jandanwala',
    'Jaranwala',
    'Jatlaan',
    'Jatoi',
    'Jauharabad',
    'Jehangira',
    'Jhal Magsi',
    'Jhand',
    'Jhang',
    'Jhatta bhutta',
    'Jhelum',
    'Jhudo',
    'Jin Pur',
    'K.N. Shah',
    'Kabirwala',
    'Kacha khooh',
    'Kahuta',
    'Kakul',
    'Kakur town',
    'Kala bagh',
    'Kala shah kaku',
    'Kalaswala',
    'Kallar Kahar',
    'Kallar Saddiyian',
    'Kallur kot',
    'Kamalia',
    'Kamalia musa',
    'Kamber ali khan',
    'Kameer',
    'Kamoke',
    'Kamra',
    'Kandh kot',
    'Kandiaro',
    'Karak',
    'Karoor pacca',
    'Karore lalisan',
    'Kashmir',
    'Kashmore',
    'Kasur',
    'Kazi ahmed',
    'Khairpur',
    'Khairpur Mir',
    'Khan Bela',
    'Khan qah sharif',
    'Khandabad',
    'Khanewal',
    'Khangarh',
    'Khanpur',
    'Khanqah dogran',
    'Khanqah sharif',
    'Kharian',
    'Khewra',
    'Khoski',
    'Khudian Khas',
    'Khurian wala',
    'Khurrianwala',
    'Khushab',
    'Khushal kot',
    'Khuzdar',
    'Khyber',
    'Klaske',
    'Kohat',
    'Kot addu',
    'Kot bunglow',
    'Kot ghulam mohd',
    'Kot mithan',
    'Kot Momin',
    'Kot radha kishan',
    'Kotla',
    'Kotla arab ali khan',
    'Kotla jam',
    'Kotla Pathan',
    'Kotli Ak',
    'Kotli Loharan',
    'Kotri',
    'Kumbh',
    'Kundina',
    'Kunjah',
    'Kunri',
    'Lakki marwat',
    'Lala musa',
    'Lala rukh',
    'Laliah',
    'Lalshanra',
    'Larkana',
    'Lasbela',
    'Lawrence pur',
    'Layyah',
    'Liaqat Pur',
    'Lodhran',
    'Lower Dir',
    'Ludhan',
    'Makli',
    'Malakand Agency',
    'Malakwal',
    'Mamu kunjan',
    'Mandi bahauddin',
    'Mandra',
    'Manga mandi',
    'Mangal sada',
    'Mangi',
    'Mangla',
    'Mangowal',
    'Manoabad',
    'Mansehra',
    'Mardan',
    'Mari indus',
    'Mastoi',
    'Matli',
    'Mehar',
    'Mehmood kot',
    'Mehrabpur',
    'Melsi',
    'Mian Channu',
    'Mian Wali',
    'Minchanabad',
    'Mingora',
    'Mir ali',
    'Miran shah',
    'Mirpur A.K.',
    'Mirpur khas',
    'Mirpur mathelo',
    'Mithi',
    'Mitiari',
    'Mohen jo daro',
    'More kunda',
    'Morgah',
    'Moro',
    'Mubarik pur',
    'Multan',
    'Muridke',
    'Murree',
    'Musafir khana',
    'Mustung',
    'Muzaffar Gargh',
    'Muzaffarabad',
    'Nankana sahib',
    'Narang mandi',
    'Narowal',
    'Naseerabad',
    'Naukot',
    'Naukundi',
    'Nawabshah',
    'New saeedabad',
    'Nilore',
    'Noor kot',
    'Nooriabad',
    'Noorpur nooranga',
    'Noshero Feroze',
    'Noudero',
    'Nowshera',
    'Nowshera cantt',
    'Nowshera Virka',
    'Okara',
    'Other',
    'Padidan',
    'Pak china fertilizer',
    'Pak pattan sharif',
    'Panjan kisan',
    'Panjgoor',
    'Pano Aqil',
    'Pano Aqil',
    'Pasni',
    'Pasrur',
    'Pattoki',
    'Phagwar',
    'Phalia',
    'Phool nagar',
    'Piaro goth',
    'Pind Dadan Khan',
    'Pindi Bhattian',
    'Pindi bohri',
    'Pindi gheb',
    'Piplan',
    'Pir mahal',
    'Pishin',
    'Qalandarabad',
    'Qamber Ali Khan',
    'Qasba gujrat',
    'Qazi ahmed',
    'Qila Deedar Singh',
    'Quaid Abad',
    'Quetta',
    'Rahim Yar Khan',
    'Rahwali',
    'Raiwind',
    'Rajana',
    'Rajanpur',
    'Rangoo',
    'Ranipur',
    'Rato Dero',
    'Rawalakot',
    'Rawat',
    'Renala khurd',
    'Risalpur',
    'Rohri',
    'Sadiqabad',
    'Sagri',
    'Sahiwal',
    'Saidu sharif',
    'Sajawal',
    'Sakhi Sarwar',
    'Samanabad',
    'Sambrial',
    'Samma satta',
    'Sanghar',
    'Sanghi',
    'Sangla Hills',
    'Sangote',
    'Sanjarpur',
    'Sanjwal',
    'Sara e naurang',
    'Sara-E-Alamgir',
    'Sarai alamgir',
    'Sargodha',
    'Satiana',
    'Sehar baqlas',
    'Sehwan Sharif',
    'Sekhat',
    'Shadiwal',
    'Shah kot',
    'Shahdad kot',
    'Shahdadpur',
    'Shahdara',
    'Shahpur chakar',
    'Shahpur Saddar',
    'Shakargarh',
    'Shamsabad',
    'Shankiari',
    'Shedani sharif',
    'Sheikhupura',
    'Sheikhupura',
    'Shemier',
    'Shikar pur',
    'Shorkot',
    'Shorkot Cantt',
    'Shuja Abad',
    'Sialkot',
    'Sibi',
    'Sihala',
    'Sikandarabad',
    'Sillanwali',
    'Sita road',
    'Skardu',
    'Skrand',
    'Sohawa',
    'Sohawa district daska',
    'Sukkur',
    'Sumandari',
    'Swabi',
    'Swat',
    'Swatmingora',
    'Takhtbai',
    'Talagang',
    'Talamba',
    'Talhur',
    'Tandiliyawala',
    'Tando adam',
    'Tando Allah Yar',
    'Tando jam',
    'Tando Muhammad Khan',
    'Tank',
    'Tarbela',
    'Tarmatan',
    'Tatlay Wali',
    'Taunsa sharif',
    'Taxila',
    'Tharo shah',
    'Thatta',
    'Theing jattan more',
    'Thull',
    'Tibba sultanpur',
    'Toba Tek Singh',
    'Topi',
    'Toru',
    'Tranda Muhammad Pannah',
    'Turbat',
    'Ubaro',
    'Ubauro',
    'Ugoke',
    'Ukba',
    'Umer Kot',
    'Upper deval',
    'Usta Muhammad',
    'Vehari',
    'Village Sunder',
    'Wah cantt',
    'Wahi hassain',
    'Wahn Bachran',
    'Wan radha ram',
    'Warah',
    'Warburton',
    'Wazirabad',
    'Yazman mandi',
    'Zafarwal',
    'Zahir Peer',
  ]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* Top Bar */}
      <View
        style={{
          flex: 0.9,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: Font.ButtonColor,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            style={{textAlign: 'left', marginLeft: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign name={'left'} size={20} color={'white'} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontFamily: 'Lexend-Regular',
            fontWeight: '400',
          }}>
          Location
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{marginRight: 8, color: 'white'}}></Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View
        style={{
          backgroundColor: Font.ButtonColor,
          marginBottom: 5,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginLeft: 5}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name={'left'} size={20} color={'white'} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            color: 'white',
            fontWeight: '700',
            marginLeft: 148,
          }}>
          Location
        </Text>
      </View> */}
      <View style={{flex: 0.8}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
          }}>
          <AntDesign
            name={'search1'}
            size={20}
            color={'grey'}
            style={{alignSelf: 'center', marginLeft: 5, marginRight: 5}}
          />
          <TextInput
            placeholder="Search"
            style={{
              padding: 6,
              borderWidth: 1,
              borderRadius: 10,
              flex: 0.97,
              backgroundColor: 'rgba(235, 238, 242, 255)',
            }}
            onChangeText={text => {
              text = text.toLowerCase();
              setPopularCityToShow(
                PopularCities.filter(city => {
                  city = city.toLowerCase();
                  if (city.includes(text)) {
                    return city;
                  }
                }),
              );

              setOtherCitiesToShow(
                OtherCities.filter(city => {
                  city = city.toLowerCase();
                  if (city.includes(text)) {
                    return city;
                  }
                }),
              );
            }}
          />
        </View>
      </View>

      <View style={{flex: 10}}>
        {PopularCitiesToShow.length > 0 ? (
          <Text
            style={{
              marginLeft: 15,
              fontSize: 18,
              fontWeight: '700',
              borderBottomWidth: 0.5,
              borderColor: 'grey',
              paddingBottom: 4,
              color: Font.LabelColor,
              fontFamily: 'Lexend-Regular',
            }}>
            Popular Cities
          </Text>
        ) : null}

        <FlatList
          data={PopularCitiesToShow}
          initialNumToRender={4}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    route.params.city(item);
                    navigation.goBack();
                  }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      borderBottomWidth: 0.5,
                      borderColor: 'grey',
                      color: Font.TextColor,
                      fontFamily: 'Lexend-Regular',
                      fontWeight: '400',

                      padding: 8,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        {OtherCitiesToShow.length > 0 ? (
          <Text
            style={{
              marginLeft: 15,
              fontSize: 18,
              fontWeight: '700',
              borderBottomWidth: 0.5,
              borderColor: 'grey',
              paddingBottom: 4,
              color: Font.LabelColor,
              fontFamily: 'Lexend-Regular',
            }}>
            Other Cities
          </Text>
        ) : null}
        <FlatList
          data={OtherCitiesToShow}
          initialNumToRender={9}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    route.params.city(item);
                    navigation.goBack();
                  }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      borderBottomWidth: 0.5,
                      borderColor: 'grey',
                      color: Font.TextColor,
                      fontFamily: 'Lexend-Regular',
                      fontWeight: '400',

                      padding: 8,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SelectCity;

const styles = StyleSheet.create({});
