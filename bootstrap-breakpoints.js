angular.module('aw.bootstrap-breakpoints',[]).directive('bootstrapBreakpoints', ['$window', function ($window) {
    "use strict";
    var directive = {
        restrict: "E",
        replace: true,
        scope: true,
        template: "<div><div class='visible-xs-block'></div><div class='visible-sm-block'></div><div class='visible-md-block'></div><div class='visible-lg-block'></div></div>",
        controller: ['$rootScope', 'Breakpoint', function ($rootScope, Breakpoint) {

            var current_bp = Breakpoint.current(),
                previous_bp = null,
                w = angular.element($window);

            w.bind('resize', function () {

                var new_bp = Breakpoint.current();
                if (new_bp != current_bp) {
                    previous_bp = current_bp;
                    current_bp = new_bp;

                    $rootScope.$broadcast('bootstrap-breakpoint.change', {
                        from: previous_bp,
                        to: current_bp
                    });
                }
            });
        }],
        link: function (scope, element, attrs) {
        }
    };
    return directive;
}]).provider('Breakpoint', [function () {
    var BREAKPOINTS = {
        XS: 'XS',
        SM: 'SM',
        MD: 'MD',
        LG: 'LG'
    };

    var get_breakpoint = function () {
        var breakpoints = {
            XS: $('.visible-sx-block').is(':visible'),
            SM: $('.visible-sm-block').is(':visible'),
            MD: $('.visible-md-block').is(':visible'),
            LG: $('.visible-lg-block').is(':visible')
        };

        for (var bp in breakpoints) {
            if (breakpoints.hasOwnProperty(bp)) {
                if (breakpoints[bp]) {
                    return BREAKPOINTS[bp];
                }
            }
        }
    };

    this.BREAKPOINTS = BREAKPOINTS;
    this.current = get_breakpoint;
    
    this.$get = function () {
        return {
            BREAKPOINTS: BREAKPOINTS,
            current: get_breakpoint
        }
    };
}]);
