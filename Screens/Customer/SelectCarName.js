import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  SectionList,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Font, Commonstyles} from '../font/Font';
import port from '../Port/Port';

const SelectCarName = ({navigation, route}) => {
  const [dataToShow, setDataToShow] = useState([
    {
      title: 'Suzuki',
      data: [
        'Mehran',
        'Cultus',
        'Swift',
        'Alto',
        'Khyber',
        'Bolan',
        'Liana',
        'Margalla',
        'Every',
        'Baleno',
        'Ravi',
        'Ciaz',
        'Hustler',
        'Celerio',
      ],
    },

    {
      title: 'Honda',
      data: [
        'Civic',
        'Vezel',
        'City',

        'Jade',
        'Accord',
        'Freed',
        'Fit',
        'Ferio',
        'Stream',
      ],
    },

    {
      title: 'Toyota',
      data: [
        'Vitz',
        'Corolla',
        'Prado',
        'Passo',
        'Fortuner',
        'Prius',
        'Noah',
        'Land Cruiser',
        'Aqua',

        'Voxy',
        'Mark',
        'Hilux',
        'Camry',
        'Premio',
        'Surf',
        'Belte',
        'Crown',
        'Pixis',
        'Porte',
        'Allion',
      ],
    },

    {
      title: 'Kia',
      data: ['Classic', 'Sportage', 'Spectra', 'Picanto', 'Other'],
    },

    {
      title: 'Daihatsu',
      data: [
        'Mira',
        'Hijet',
        'Boon',
        'Cast',
        'Cuore',
        'Terios',
        'Copen',
        'Esse',
        'Tanto',
        'Move',
      ],
    },

    {
      title: 'Nissan',
      data: [
        'Dayz',
        'Juke',
        'Sunny',
        'Clipper',
        'Patrol',
        'Moco',
        'Note',
        'Otti',
        'Tidda',

        'Bluebird',

        'Navara',
        'Caravan',
      ],
    },
  ]);
  // const DATA = [
  //   {
  //     title: 'Audio / Video',
  //     data: [
  //       'Amplifiers',
  //       'Android Panel',
  //       'Audio Accessories',
  //       'Base Tubes',
  //       'Cables',
  //       'Other',
  //       'Players',
  //       'Sound Damping Sheets',
  //       'Speakers',
  //       'Video Displays',
  //       'Woofers',
  //     ],
  //   },
  //   {
  //     title: 'Bikes',
  //     data: [
  //       'Bike Air Filters',
  //       'Bike Brake Pads',
  //       'Bike Clutch Plates',
  //       'Bike Parts ',
  //       'Bikes Accessories',
  //       'Helmets',
  //       'Motorcycle Gloves',
  //     ],
  //   },
  //   {
  //     title: 'Brakes',
  //     data: [
  //       'ABS and Parts',
  //       'Brake Caliper',
  //       'Brake Pads',
  //       'Brake Parts',
  //       'Brake Rotors',
  //       'Brake Shoe',
  //       'Brake Switch',
  //       'Disc Brake Covers',
  //       'Discs',
  //       'Drums',
  //       'Hand Brakes',
  //       'Hydraulic Cylinder',
  //       'Master Brake Cylinders',
  //       'Other',
  //     ],
  //   },
  //   {
  //     title: 'Car Care',
  //     data: [
  //       'Air Freshner',
  //       'All Purpose Cleaners',
  //       'Car Shampoo',
  //       'Car Top Covers',
  //       'Car Wax',
  //       'Compounds',
  //       'Coolants',
  //       'Detailing Brushes',
  //       'Engine Cleaners ',
  //       'Exterior Care',
  //       'Glass Cleaners',
  //       'Interior Care',
  //       'Leather Care ',
  //       'Microfiber Clothes ',
  //       'Other',
  //       'Paint',
  //       'Polisher Machine &amp; Buffers',
  //       'Polishes',
  //       'Pressure Washers',
  //       'Protectants',
  //       'Scratch Remover ',
  //       'Sealant/Glass Coat',
  //       'Tyre Care ',
  //       'Undercoating',
  //       'Vacuum Cleaners',
  //     ],
  //   },
  //   {
  //     title: 'Car utilities',
  //     data: ['Car Fridge ', 'Portable Fans & Heaters'],
  //   },
  //   {
  //     title: 'Engine & Mechanical',
  //     data: [
  //       'A/C Belt',
  //       'AC Filters',
  //       'Air Conditioning & Heating',
  //       'Air Suspension Kit',
  //       'Balance Rod Bush',
  //       'Ball Joints',
  //       'Belts',
  //       'Bushings',
  //       'Clutch Cables',
  //       'Clutch Plates',
  //       'CNG Kits',
  //       'Complete Engines',
  //       'Condensor',
  //       'Crank',
  //       ' Pistons & Components',
  //       'Engine Mount',
  //       'Fan Belt',
  //       'Filters',
  //       'Fuel Filters',
  //       'Fuel Injector',
  //       'Fuel Pump',
  //       'Gasket & Seals',
  //       'Hoses & Pipes',
  //       'Oil Filters',
  //       'Other',
  //       'Oxygen Sensors',
  //       'Radiator Caps',
  //       'Radiator',
  //       ' Fans & Cooling Parts',
  //       'Shocks',
  //       'Solenoids',
  //       'Spark Plugs ',
  //       'Suspension',
  //       'Throttle Body',
  //       'Timing Belts',
  //       'Turbos & Superchargers',
  //       'Water Pumps',
  //     ],
  //   },
  //   {
  //     title: 'Exhaust and Parts',
  //     data: ['Catalytic Converter'],
  //   },
  //   {
  //     title: 'Exterior',
  //     data: [
  //       'Air Flows',
  //       'Antenna',
  //       'Bumper Diffusers',
  //       'Bumper Styling ',
  //       'Bumpers ',
  //       'Bumpers & Components',
  //       'Car Bonnets',
  //       'Car Doors',
  //       'Car Hoods ',
  //       'Car Insulation Sheets',
  //       'Car Mirrors',
  //       'Car Wraps & Tints',
  //       'Chrome Accessories',
  //       'Chrome Handle Covers',
  //       'Chrome Trim & Accessories',
  //       'Door Guards',
  //       'Door Mouldings',
  //       'Double Sided Tapes',
  //       'Emblems & Stickers',
  //       'Fenders ',
  //       'Grills',
  //       'Guards',
  //       'Immobilizers',
  //       'Metal Logos',
  //       'Mirrors/Screens',
  //       'Mud Guards',
  //       'Number Plate Frames',
  //       'Other',
  //       'Rear View Camera',
  //       'Roof Racks & Rails',
  //       'Rubber Lip Extensions',
  //       'Side Mirrors ',
  //       'Spoilers & Body Kits',
  //       'Sun Visors ',
  //       'Trunk',
  //       'Window Louvers',
  //       'Window Tint',
  //       'Windshield',
  //       'Wiper Blades',
  //       'Wiper Bottles',
  //     ],
  //   },
  //   {
  //     title: 'Interior',
  //     data: [
  //       'Armrest ',
  //       'Ashtray',
  //       'Auto Gauges & Meters',
  //       'Back & Neck Care',
  //       'Blinders',
  //       'Car Organizers',
  //       'Car Tissue Box',
  //       'Carpets',
  //       'Cigarette Lighters',
  //       'Console Box',
  //       'Dashboard Carpet',
  //       'Door Parts',
  //       'Floor Mats',
  //       'Gear Knobs',
  //       'Interior Chrome Accessories',
  //       'Mobile Chargers & Holders',
  //       'Mobile Holders',
  //       'Other',
  //       'Pedal Covers',
  //       'Seat Belt',
  //       'Seat Covers',
  //       'Seats',
  //       'Shades',
  //       'Speedo Meter and Parts',
  //       'Steering Covers',
  //       'Trunk Mats',
  //     ],
  //   },
  //   {
  //     title: 'Lights & Electrical',
  //     data: [
  //       'Alarm System',
  //       'Bar Lights ',
  //       'Batteries',
  //       'Bulbs ',
  //       'Cables',
  //       'Central Locking',
  //       'Cruise Control Kits',
  //       'Fog Lamps',
  //       'Headlights',
  //       'HID&#39;s',
  //       'Horns',
  //       'Ignition Switch ',
  //       'Indicator Lights',
  //       'Interior Lights ',
  //       'LED&#39;s',
  //       'Lights',
  //       'Navigation',
  //       'Other',
  //       'Plug Wire',
  //       'Plugs',
  //       'Switches & Buttons',
  //       'Tail Lights',
  //       'Third Brake Lamps',
  //     ],
  //   },
  //   {
  //     title: 'Oil & Lubricants',
  //     data: [
  //       'ATF/MTF Oil',
  //       'Brake Oil',
  //       'Chain Lubes & Cleaners',
  //       'CVTF Oil',
  //       'Engine Oil',
  //       'Fuel Additives',
  //       'Gear Oil',
  //       'Multipurpose Grease',
  //       'Oil Additives',
  //       'Power Steering Oil',
  //       'PSF Oil',
  //     ],
  //   },
  //   {
  //     title: 'Security & Sensors',
  //     data: [
  //       'Cameras',
  //       'GPS Trackers',
  //       'Locks',
  //       'Parking Sensors ',
  //       'Security Alarm Systems',
  //     ],
  //   },
  //   {
  //     title: 'Tools & Gadgets',
  //     data: [
  //       'Air Blowers',
  //       'Air Compressor',
  //       'Car Jack ',
  //       'Car Keys',
  //       'Die Cast Models',
  //       'Digital Compass',
  //       'Heat Guns',
  //       'Jump Starter Kits',
  //       'Key Chains',
  //       'Key Covers',
  //       'Tool Kits',
  //       'Tow Hooks & Chains',
  //       'Tyre Pressure Guage',
  //       'USB Car Charger',
  //     ],
  //   },
  //   {
  //     title: 'Tyre & Wheels',
  //     data: [
  //       'Alloy Wheels',
  //       'Car Tyres',
  //       'her',
  //       'Tyres',
  //       'Wheel Bearings',
  //       'Wheel Covers',
  //     ],
  //   },
  //   {
  //     title: 'Bicycle',
  //     data: ['Mountain Bikes', 'Sohrab'],
  //   },
  //   {
  //     title: 'Other Vehicles',
  //     data: ['Boats - Ships', 'other', 'Tucks'],
  //   },
  // ];

  const DATA = [
    {
      title: 'Suzuki',
      data: [
        'Wagon R',
        'Mehran',
        'Cultus',
        'Swift',
        'Alto',
        'Khyber',
        'Bolan',
        'Liana',
        'Margallla',
        'Every',
        'Baleno',
        'Ravi',
        'Ciaz',
        'Hustler',
        'Celerio',
      ],
    },

    {
      title: 'Honda',
      data: [
        'Civic',
        'Vezel',
        'City',
        'BR-V',
        'N One',
        'Jade',
        'Accord',
        'Freed',
        'Fit',
        'Ferio',
        'Stream',
      ],
    },

    {
      title: 'Toyota',
      data: [
        'Vitz',
        'Corolla',
        'Prado',
        'Passo',
        'Fortuner',
        'Prius',
        'Noah',
        'Land Cruiser',
        'Aqua',
        'C-HR',
        'Voxy',
        'Mark X',
        'Hilux',
        'Camry',
        'Premio',
        'Surf',
        'Belte',
        'Crown',
        'Pixis',
        'Porte',
        'Allion',
      ],
    },

    {
      title: 'Kia',
      data: ['Classic', 'Sportage', 'Spectra', 'Picanto', 'Other'],
    },

    {
      title: 'Daihatsu',
      data: [
        'Mira',
        'Hijet',
        'Boon',
        'Cast',
        'Cuore',
        'Terios',
        'Copen',
        'Esse',
        'Tanto',
        'Move',
      ],
    },

    {
      title: 'Nissan',
      data: [
        'Dayz',
        'Juke',
        'Sunny',
        'Clipper',
        'Patrol',
        'Moco',
        'Note',
        'Otti',
        'Tidda',

        'Bluebird',

        'Navara',
        'Caravan',
      ],
    },

    {
      title: 'Mercedes Benz',
      data: ['S CLass', 'C Class', 'E Class'],
    },

    {
      title: 'Range Rover',
      data: ['Vogue', 'Sport'],
    },
  ];

  return (
    <View style={{flex: 1}}>
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
          Category and SubCategory
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
            marginLeft: 83,
          }}>
          Category and SubCategory
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
            placeholderTextColor={Font.TextColor}
            style={{
              padding: 6,
              borderWidth: 1,
              borderRadius: 10,
              flex: 0.97,
              backgroundColor: 'rgba(235, 238, 242, 255)',
            }}
            onChangeText={text => {
              text = text.toLowerCase();
              setDataToShow(
                DATA.map(obj => {
                  const subCategory = obj.data.filter(category => {
                    category = category.toLowerCase();
                    if (category.includes(text)) {
                      return category;
                    }
                  });

                  if (subCategory.length > 0) {
                    obj.data = subCategory;
                    return obj;
                  } else {
                    obj.data = '';
                    return obj;
                  }
                }),
              );
            }}
          />
        </View>
      </View>
      <View style={{flex: 10}}>
        <SectionList
          sections={dataToShow}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, section}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    route.params.category(section.title + ' ' + item);

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
          renderSectionHeader={({section: {title}}) => (
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
              {title}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default SelectCarName;

const styles = StyleSheet.create({});
