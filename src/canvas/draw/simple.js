/**
 * @author kyle / http://nikai.us/
 */

import pathSimple from "../path/simple";

export default {
    draw: function(context, dataSet, options) {

        context.save();

        for (var key in options) {
            context[key] = options[key];
        }

        var data = dataSet.get();

        for (var i = 0, len = data.length; i < len; i++) {

            var item = data[i];

            context.save();

            if (item.fillStyle) {
                context.fillStyle = item.fillStyle;
            }

            if (item.strokeStyle) {
                context.strokeStyle = item.strokeStyle;
            }

            var type = item.geometry.type;

            context.beginPath();

            pathSimple.draw(context, item, options);

            if (type == 'Point' || type == 'Polygon' || type == 'MultiPolygon') {

                context.fill();

                if (item.strokeStyle || options.strokeStyle) {
                    context.stroke();
                }
            } else if (type == 'LineString') {
                context.stroke();
            }

            context.restore();

        };

        context.restore();

    }
}