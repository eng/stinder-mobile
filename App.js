import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      currentIdea: ''
    };
    this.randomIdea = this.randomIdea.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    this.getIdeas();
  }

  getIdeas() {
    fetch('http://stinder.herokuapp.com/ideas.json').then(function(response) {
      return response.json();
    }).then(function(json) {
      this.setState({
        ideas: json.map((idea) => idea.description)
      }, this.randomIdea)
    }.bind(this))
  }

  randomIdea() {
    let newIdea;
    if (this.state.ideas.length > 0) {
      newIdea =  this.state.ideas[Math.floor(Math.random() * this.state.ideas.length)];
    } else {
      newIdea = "No more ideas. Go outside for once." 
    }
    this.setState({
      currentIdea: newIdea
    });
  }

  vote(number) {
    if (this.state.currentIdea !== "") {
      let newIdeas = this.state.ideas.slice();
      const index = newIdeas.indexOf(this.state.currentIdea);
      if (index > -1) {
        newIdeas.splice(index, 1)
        this.setState({
          ideas: newIdeas 
        }, this.randomIdea);
      }
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.state.currentIdea}
        </Text>
        {this.state.ideas.length > 0 && 
          <View style={styles.buttons}>
            <View style={styles.buttonWrapper}>
              <Icon.Button style={styles.button} name="thumbs-up" backgroundColor="green" onPress={() => alert("hello")}>Yeah!</Icon.Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Icon.Button style={styles.button} name="thumbs-down" backgroundColor="red" onPress={() => this.vote(-1)}>Nope.</Icon.Button>
            </View>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row'
  },
  buttonWrapper: {
    marginRight: 10
  },
  button: {
    padding: 20
  },
  title: {
    fontSize: 60,
    marginBottom: 30
  }
});
