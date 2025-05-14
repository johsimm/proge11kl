var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractResistor = /** @class */ (function () {
    function AbstractResistor(name) {
        this.name = name;
    }
    return AbstractResistor;
}());
var Resistor = /** @class */ (function (_super) {
    __extends(Resistor, _super);
    function Resistor(name) {
        return _super.call(this, name) || this;
    }
    Resistor.prototype.draw = function (g, startx, y) {
        g.beginPath();
        g.moveTo(startx, y);
        g.lineTo(startx + this.getWidth() / 4, y);
        g.rect(startx + this.getWidth() / 4, y - 10, this.getWidth() / 2, 20);
        g.fillText(this.name, startx + this.getWidth() / 4 + 1, y + 2);
        g.moveTo(startx + this.getWidth() * 3 / 4, y);
        g.lineTo(startx + this.getWidth(), y);
        g.stroke();
    };
    Resistor.prototype.getWidth = function () { return 50; };
    Resistor.prototype.getHeight = function () { return 30; };
    return Resistor;
}(AbstractResistor));
var SeriesConnection = /** @class */ (function (_super) {
    __extends(SeriesConnection, _super);
    function SeriesConnection(name) {
        var _this = _super.call(this, name) || this;
        _this.resistors = [];
        return _this;
    }
    SeriesConnection.prototype.addResistor = function (r) {
        this.resistors.push(r);
    };
    SeriesConnection.prototype.getWidth = function () {
        var sum = 0;
        for (var _i = 0, _a = this.resistors; _i < _a.length; _i++) {
            var r = _a[_i];
            sum += r.getWidth();
        }
        return sum + 10;
    };
    SeriesConnection.prototype.getHeight = function () {
        return Math.max.apply(Math, this.resistors.map(function (r) { return r.getHeight(); })) + 20;
    };
    SeriesConnection.prototype.draw = function (g, startx, y) {
        var x = startx;
        g.beginPath();
        g.moveTo(x, y);
        x += 5;
        g.lineTo(x, y);
        g.stroke();
        var areaStartX = x;
        for (var i = 0; i < this.resistors.length; i++) {
            this.resistors[i].draw(g, x, y);
            x += this.resistors[i].getWidth();
        }
        g.strokeStyle = "lightgray";
        g.beginPath();
        g.rect(areaStartX, y - this.getHeight() / 2, x - areaStartX, this.getHeight());
        g.stroke();
        g.strokeStyle = "black";
        g.beginPath();
        g.moveTo(x, y);
        x += 5;
        g.lineTo(x, y);
        g.stroke();
        g.fillText(this.name, startx + this.getWidth() / 2 - 10, y + this.getHeight() / 2);
    };
    return SeriesConnection;
}(AbstractResistor));
