import Search from './Search.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: props.searchYouTube,
      storage: [],
      currVideo: {
        id: {videoId: ''},
        src: '',
        snippet: {title: '', description: ''}
      },
      query: ''
    };

    this.onTitleClick = this.onTitleClick.bind(this);
    this.userInput = this.userInput.bind(this);
  }

  onTitleClick(event) {
    this.setState({
      currVideo: this.state.storage[event.target.id]
    });
  }

  userInput(event) {
    // Use underscore _.debounce
    this.state.search(event.target.value, (data) => {
      this.setState({storage: data, currVideo: data[0]});
    });
  }

  componentDidMount() {
    // TODO
    if (this.state.search) {
      this.state.search('', (data) => {
        this.setState({storage: data, currVideo: data[0]});
      });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search task={this.userInput}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currVideo} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.storage} task={this.onTitleClick}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
