import { Card } from 'react-bootstrap';
import classNames from 'classnames';

type StatisticsWidgetProps = {
    textClass?: string;
    iconPath: string;
    bgClass?: string;
    icon?: string;
    title: string;
    description: string;
    stats?: string;
    trend: {
        textClass?: string;
        icon?: string;
        value?: string;
        time?: string;
    };
};

const StatisticsWidget = ({ textClass, bgClass, icon,iconPath, title, stats, trend, description }: StatisticsWidgetProps) => {
    return (
        <Card className={classNames('widget-flat', bgClass)}>
            <Card.Body>
            {iconPath && (
                    <div className="float-end">
                          <img src={iconPath} alt='Statistics Icon'/>
                    </div>
                )}
                <h5
                    className={classNames( 'mt-0','' , textClass ? textClass : 'text-muted')}
                    title={description}
                >
                    {title}
                </h5>
               <h3 className={classNames('mt-3', 'mb-3', textClass ? textClass : null)}> < span className="page-title">{stats}</span></h3>
                                                                                                                                                                

                {trend && (
                    <p className={classNames('mb-0', textClass ? textClass : 'text-muted')}>
                        <span className={classNames(trend.textClass, 'me-2')}>
                            <i className={classNames(trend.icon)}></i> {trend.value}
                        </span>
                        <span className="text-nowrap">{trend.time}</span>
                    </p>
                )}
            </Card.Body>
        </Card>
    );
};

export default StatisticsWidget;
