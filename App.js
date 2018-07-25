import React, {Component}    from 'react';
import YouTube               from 'react-native-youtube';
import ProgressBarAnimated   from 'react-native-progress-bar-animated';
import Icon                  from 'react-native-vector-icons/Feather';
import { Provider, connect } from 'react-redux';
import { toHHMMSS }          from './utils';

import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';

import {
  togglePlay,
  setCurrentTime,
  setDuration
} from './store/actions';

type Props = {};
class GnarBox extends Component<Props> {

  _handleProgress(e) {
    const { currentTime, duration } = e;
    // if we have already set it once, don't set duration again
    if (this.props.duration === 0) this.props.setDuration(Math.round(duration));
    this.props.setCurrentTime(Math.round(currentTime));
  }

  render() {
    const barWidth = Dimensions.get('screen').width - 250;
    return (
      <ScrollView contentContainerStyle={{ // quick fix for horizontal viewing
          flexGrow: 1
      }}>
        
        <View style={styles.container}>
          <Text style={styles.zach}>zach baker</Text>
          <Text style={styles.titleText}>GNAR</Text>

          <YouTube
            videoId="3NhHqPA8nIs" // gnarbox 2.0
            play={this.props.play}
            fullscreen={false} // to be able to see custom components
            loop={true}
            controls={0} // hide the yt controls
            onReady={e => {
              // console.log('e inside of ready', e)
              this.setState({ isReady: true })}
            }
            onChangeState={e => {
              // console.log('e', e)
              this.setState({ status: e.state })}
            }
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            onProgress={this._handleProgress.bind(this)}
            style={{ alignSelf: 'stretch', height: 300 }}
            ref="youtubePlayer"
          />

          <View style={styles.controls}>

            {this.props.play ? 
              <Icon
                name="pause"
                size={30}
                color="#C5C6C7"
                onPress={this.props.togglePlay}
              />
              :
                <Icon
                  name="play"
                  size={30}
                  color="#C5C6C7"
                  onPress={this.props.togglePlay}
                />
            }

            <Icon
                name="skip-back"
                size={25}
                color="#C5C6C7"
                onPress={()=> {
                  // this.props.skipAhead();
                  this.refs.youtubePlayer.seekTo(this.props.currentTime < 21 ? 0 : this.props.currentTime - 20);
                  this.props.setCurrentTime(this.props.currentTime < 21 ? 0 : this.props.currentTime - 20)
                }}
              />

            <Text style={styles.time}>{toHHMMSS(this.props.currentTime)}</Text>

            <View style={styles.progressBar}>
              <ProgressBarAnimated
                width={barWidth}
                barAnimationDuration={200}
                height={10}
                backgroundColor={'#66FCF1'}
                borderWidth={0}
                value={this.props.currentTime/this.props.duration*100}
              />
            </View>

            <Text style={styles.time}>-{toHHMMSS(this.props.duration - this.props.currentTime)}</Text>

            <Icon
              name="skip-forward"
              size={25}
              color="#C5C6C7"
              onPress={()=> {
                this.refs.youtubePlayer.seekTo(this.props.currentTime + 20);
                this.props.setCurrentTime(this.props.currentTime + 20)

              }}
            />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0C10',
    paddingVertical: 40,
  },
  zach: {
    fontFamily: 'Avenir Next',
    fontSize: 30,
    height: 40,
    color: '#fff'
  },
  titleText: {
    fontFamily: 'Avenir Next',
    fontSize: 50,
    color: '#66FCF1',
    height: 100
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 100,
    width: '100%'
  },
  progressBar: {
    backgroundColor: '#45A29E',
    borderRadius: 6
  },
  time: {
    color: '#C5C6C7',
    fontFamily: 'Avenir Next'
  }
});

const mapStateToProps = state => {
  let { play, duration, currentTime } = state;
  return {
    play,
    duration,
    currentTime
  };
};

const mapDispatchToProps = {
  togglePlay,
  setCurrentTime,
  setDuration
};

export default connect(mapStateToProps, mapDispatchToProps)(GnarBox);