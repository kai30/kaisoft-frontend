/**
 * Created by qhyang on 2017/3/23.
 */

interface Widget {
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
    zIndex?: number;
    config?: WidgetConfig;
    data?: WidgetData;
}
interface WidgetConfig {
    type?: string;
    types?: Object[];
}
interface WidgetData {
    imgUrl?: string;
}

export { Widget, WidgetConfig };