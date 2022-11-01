var elements = document.getElementsByName("carousel");
for (var i = 0; i < elements.length; i++) {
  var elt = elements[i];
  var prev = elt.getElementsByTagName("button")[0],
    next = elt.getElementsByTagName("button")[1];

  var ul = elt.getElementsByTagName("ul")[0];
  var imgs = ul.getElementsByTagName("li");

  AddMoving(ul, prev, next);
}

var width = 292,
  toOne = (0.99).toFixed(1),
  TERM = 200,
  RANGE = 50;

console.log(width);

function power(arg) {
  /*return Math.pow(arg, 4)*/
  /*return 1 - Math.pow((arg - 1), 4)*/
  return Math.sqrt(1 - Math.pow(arg - 1, 2));
}

function elastic(arg) {
  var halfOne = (0.5).toFixed(1); // RATE = 6, KF = Math.pow(2, RATE);
  //return 1 - KF * Math.pow((arg-halfOne), RATE)
  return Math.sqrt(1 - 4 * Math.pow(arg - halfOne, 2));
}

function AddMoving(ul, prev, next) {
  var position = 0;
  //enable = true;

  prev.onclick = function () {
    var myself = this;
    myself.style.display = "none";

    // if (position >= 0) {
    // ul.style.marginleft = position + "px";
    // animate(
    //   {
    //     duration: TERM,
    //     timing: function (timeFraction) {
    //       return elastic(timeFraction);
    //     },
    //     draw: function (progress) {
    //       ul.style.left = position + RANGE * progress + "px";
    //     },
    //   },
    //   function () {
    //     myself.style.display = "block";
    //   }
    // );
    //   return false;
    // }

    // position = Math.min(position + width, 0);
    ul.style.left = position + width + "px";
    // animate(
    // {
    // duration: TERM,
    // timing: function (timeFraction) {
    // return power(timeFraction);
    // },
    // draw: function (progress) {
    // ul.style.left = position + width * (progress - 1) + "px";
    // },
    // },
    // function () {
    myself.style.display = "block";
    // }
    // );

    return false;
  };

  next.onclick = function () {
    //console.log(width);
    var myself = this;
    myself.style.display = "none";

    if (position <= -width * (imgs.length - 1)) {
      animate(
        {
          duration: TERM,
          timing: function (timeFraction) {
            return elastic(timeFraction);
          },
          draw: function (progress) {
            ul.style.left = position - RANGE * progress + "px";
          },
        },
        function () {
          myself.style.display = "block";
        }
      );
      return false;
    }

    position = Math.max(position - width, -width * (imgs.length - 1));
    animate(
      {
        duration: TERM,
        timing: function (timeFraction) {
          return power(timeFraction);
        },
        draw: function (progress) {
          ul.style.left = position + width * (1 - progress) + "px";
        },
      },
      function () {
        myself.style.display = "block";
      }
    );

    //if(active){this.style.display = "block"};
    return false;
  };
}
