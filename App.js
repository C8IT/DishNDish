import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList, 
  Image, 
} from 'react-native';

const API_ENDPOINT = ''; // API goes here
// const API_ENDPOINT = 'https://randomuser.me/api/?results=30';

export default function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => { // Causing the search filter to disappear
  //   setIsLoading(true);
  //   fetchData(API_ENDPOINT);
  // }, []);

  const fetchData = async(url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);

      console.log(json.results);

      setIsLoading(false);

    }
    catch (error) {
      setError(error);
      console.log(error);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  // if (isLoading) {
  //   return (
  //     <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
  //       <ActivityIndicator size={"large"} color ="#5500dc" />
  //     </View>
  //   );
  // }

  // if (error) { // Handles error
  //   return (
  //     <View style = {{flex:1, justifyContent:'center',alignItems:'center'}}>
  //       <Text>
  //         Error in fetching data...
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={{flex:1, marginhorizontal:20}}>
      <TextInput 
        placeholder='Search'
        clearButtonMode='always' 
        style={styles.searchBox}
        autoCapitalize='none'
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.login.username}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image source={{uri: item.picture.thumbnail}} />
            <View>
              <Text style={styles.textName}>{item.name.first} {item.name.last}</Text>
              <Text style={styles.textEmail}>{item.email}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal:20, 
    paddingVertical:10, 
    borderColor:'#ccc', 
    borderWidth:1, 
    borderRadius:8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  // image: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  // },
  // textName: {
  //   fontSize: 17,
  //   marginLeft: 10,
  //   fontWeight: "600",
  // },
  // textEmail: {
  //   fontSize: 14,
  //   marginLeft: 10, 
  //   color: "gray",
  // },
});
