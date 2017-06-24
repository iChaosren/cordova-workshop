var TouchMenuLA = function (options) {
    var self,
        defaults,
		menuClassName = '',
		mask,
		handle,
		menuHammer,
		maskHammer,
		newPos = 0,
		currentPos = 0,
		startPoint = 0,
		countStart = 0,
		velocity = 0.0;

    var TouchMenuLA = function () {
        self = this;

        defaults = {
            width: 280,
            zIndex: 99999,
            disableSlide: false,
            handleSize: 20,
            disableMask: false,
            maxMaskOpacity: 0.5
        };

        this.isVisible = false;

        this.initialize();
    };

    TouchMenuLA.prototype.setDefaultsOptions = function () {
        for (var key in defaults) {
            if (!options[key]) {
                options[key] = defaults[key];
            }
        }
    };

    TouchMenuLA.prototype.initElements = function () {
        options.target.style.zIndex = options.zIndex;
        options.target.style.width = options.width + 'px';
        options.target.style.left = -options.width + 'px';

        handle = document.createElement('div');
        handle.className = "tmla-handle";
        handle.style.width = options.handleSize + 'px';
        handle.style.right = -options.handleSize + 'px';

        options.target.appendChild(handle);

        if (!options.disableMask) {
            mask = document.createElement('div');
            mask.className = 'tmla-mask';
            document.body.appendChild(mask);

            maskHammer = new Hammer(mask, null);
        }
    };

    TouchMenuLA.prototype.touchStartMenu = function () {
        menuHammer.on('panstart panmove', function (ev) {

            console.log(ev);

            if(Math.abs(ev.angle) < 30 || Math.abs(ev.angle) > 150)
            {                
                newPos = currentPos + ev.deltaX;
                self.changeMenuPos();
                velocity = Math.abs(ev.velocity);
            }
        });
        console.log('touchStartMenu');
    };

    TouchMenuLA.prototype.changeMenuPos = function () {
        if (newPos <= options.width) {
            options.target.className = menuClassName + ' tmla-menu';
            options.target.style.transform = 'translate3d(' + newPos + 'px, 0, 0)';
            options.target.style.WebkitTransform = 'translate3d(' + newPos + 'px, 0, 0)';
            options.target.style.MozTransform = 'translate3d(' + newPos + 'px, 0, 0)';

            if (!options.disableMask) {
                this.setMaskOpacity(newPos);
            }
        }
        console.log('changeMenuPos');
    };

    TouchMenuLA.prototype.setMaskOpacity = function (newMenuPos) {
        var opacity = parseFloat((newMenuPos / options.width) * options.maxMaskOpacity);

        mask.style.opacity = opacity;

        if (opacity === 0) {
            mask.style.zIndex = -1;
        } else {
            mask.style.zIndex = options.zIndex - 1;
        }

        console.log('setMaskOpacity');
    };

    TouchMenuLA.prototype.touchEndMenu = function () {
        menuHammer.on('panend pancancel', function (ev) {

            if(ev.additionalEvent != "pandown" && ev.additionalEvent != "panup")
            {

                console.log(ev)

                currentPos = ev.deltaX;
                self.checkMenuState(ev.deltaX); 
            }               
                
            console.log('touchEndMenu panend pancancel');
        });

        console.log('touchEndMenu');
    };

    TouchMenuLA.prototype.eventStartMask = function () {
        maskHammer.on('panstart panmove', function (ev) {
            if (ev.center.x <= options.width && self.isVisible) {
                countStart++;

                if (countStart == 1) {
                    startPoint = ev.deltaX;
                }
                 
                    if(Math.abs(ev.angle) > 150 || Math.abs(ev.angle) < 30)
                    {
                        console.log('moved');

                        newPos = (ev.deltaX - startPoint) + options.width;

                        self.changeMenuPos();
                        velocity = Math.abs(ev.velocity);
                    }
            }

            console.log(ev)

            console.log('eventStartMask panstart panmove');
        });

        console.log('eventStartMask');
    };

    TouchMenuLA.prototype.eventEndMask = function () {
        maskHammer.on('panend pancancel', function (ev) {
            self.checkMenuState(ev.deltaX);
            countStart = 0;

            console.log('eventEndMask panend pancancel');
        });

        console.log('eventEndMask');
    };

    TouchMenuLA.prototype.clickMaskClose = function () {
        mask.addEventListener('click', function () {
            self.close();

            console.log('clickMaskClose click');
        });

        console.log('clickMaskClose');
    };

    TouchMenuLA.prototype.checkMenuState = function (deltaX) {
        if (velocity >= 1.0) {
            if (deltaX >= 0) {
                self.open();
            } else {
                self.close();
            }
        } else {
            if (newPos >= 100) {
                self.open();
            } else {
                self.close();
            }
        }

        console.log('checkMenuState');
    };

    TouchMenuLA.prototype.open = function () {
        options.target.className = menuClassName + " tmla-menu opened";
        options.target.style.transform = 'translate3d(' + options.width + 'px, 0, 0)';
        options.target.style.WebkitTransform = 'translate3d(' + options.width + 'px, 0, 0)';
        options.target.style.MozTransform = 'translate3d(' + options.width + 'px, 0, 0)';

        currentPos = options.width;
        this.isVisible = true;

        self.showMask();
        self.invoke(options.onOpen);

        console.log('open');
    };

    TouchMenuLA.prototype.close = function () {
        options.target.className = menuClassName + " tmla-menu closed";
        currentPos = 0;
        self.isVisible = false;

        self.hideMask();
        self.invoke(options.onClose);

        console.log('close');
    };

    TouchMenuLA.prototype.toggle = function () {
        if (self.isVisible) {
            self.close();
        } else {
            self.open();
        }

        console.log('toggle');
    };

    TouchMenuLA.prototype.showMask = function () {
        mask.className = "tmla-mask transition";
        mask.style.opacity = options.maxMaskOpacity;
        mask.style.zIndex = options.zIndex - 1;

        console.log('showMask');
    };

    TouchMenuLA.prototype.hideMask = function () {
        mask.className = "tmla-mask transition";
        mask.style.opacity = 0;
        mask.style.zIndex = -1;

        console.log('hideMask');
    };

    TouchMenuLA.prototype.setMenuClassName = function () {
        menuClassName = options.target.className;

        console.log('setMenuClassName');
    };

    TouchMenuLA.prototype.invoke = function (fn) {
        if (fn) {
            fn.apply(self);
        }

        console.log('invoke');
    };

    TouchMenuLA.prototype.initialize = function () {
        if (options.target) {
            menuHammer = Hammer(options.target, null);

            self.setDefaultsOptions();
            self.setMenuClassName();
            self.initElements();

            if (!options.disableSlide) {
                self.touchStartMenu();
                self.touchEndMenu();
                self.eventStartMask();
                self.eventEndMask();
            }

            if (!options.disableMask) {
                self.clickMaskClose();
            }
        } else {
            console.error('TouchMenuLA: The option \'target\' is required.');
        }

        console.log('initialize');
    };

    return new TouchMenuLA();
};