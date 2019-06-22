// Options 

const CLIENT_ID = '635740455718-e33p17u7kpoe102e3v9avopvl5gaand7.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content = document.getElementById('content');
const chanelForm = document.getElementById('channel-form');
const channelInput = document.getElementById('channel-input');
const videoContainer = document.getElementById('video-container');

const defaultChannel = 'techguyweb';


// Load auth2 lib
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

// Init API client lib and set up sign in listeners
function initClient() {
	gapi.client
		.init({
			discoveryDocs: DISCOVERY_DOCS,
			clientId: CLIENT_ID,
			scope: SCOPES
	})
	.then(() => {
		// Listen for sign in state changes
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		// Handle inital sign in state
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		authorizeButton.onclick = handleAuthClick;
		signoutButton.onclick = handleSignoutClick;
	})
}

// Update UI Sign in state change
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		authorizeButton.style.display = 'none';
		signoutButton.style.display = 'block';
		content.style.display = 'block';
		videoContainer.style.display = 'block';
		getChannel(defaultChannel);
	} else {
		authorizeButton.style.display = 'block';
		signoutButton.style.display = 'none';
		content.style.display = 'none';
		videoContainer.style.display = 'none';
	}
}

// Handle login
function handleAuthClick() {
	gapi.auth2.getAuthInstance().signIn();
}

// Handle logout
function handleSignoutClick() {
	gapi.auth2.getAuthInstance().signOut();
}

// Get channel from API
function getChannel(channel) {
	console.log(channel);
}