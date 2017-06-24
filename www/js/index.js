
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');

        var drawerMenu = document.getElementById('drawer-menu');

        var drawer;

        if(window.outerWidth >= 280)
            drawer = TouchMenuLA({
                target: drawerMenu
            });
        else
            drawer = TouchMenuLA({
                target: drawerMenu,
                width: (window.outerWidth - 20)
            });

        $('.open-drawer').click(() => {
            drawer.toggle();
        });

    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};

app.initialize();

