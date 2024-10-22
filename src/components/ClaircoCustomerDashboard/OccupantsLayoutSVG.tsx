import React, { useEffect, useRef, useState } from 'react';
import TableSkelton from 'components/ClaircoCustomer/Skeltons/TableSkelton';
import { useNavigate } from 'react-router-dom';
import throttle from 'lodash/throttle';
// import debounce from 'lodash/debounce';

import { LayoutToolTip } from './ToolTip/LayoutToolTip';
import { object } from 'yup';
export const OccupantsLayoutSVG = ({
    currentState,
    elementsToGreen,
    elementsToRed,
    occupancyDeviceIds,
    vrfTooltipData,
    occupancyTooltipData,
    isDataLoading,
}: any) => {
    const [svgData, setSvgdata] = useState('');
    const [inactiveGtagId, setInactiveGtagId] = useState('');
    const [vrfMapper, setVrfMapper] = useState({});
    const [occupancyMapper, setOccupancyMapper] = useState({});
    const [greenElements, setGreenElements] = useState({});
    const [redElements, setRedElements] = useState({});
    const [showToolTip, setShowToolTip] = useState(false);
    const [toolTipPosition, setToolTipPosition] = useState({});
    const [tooltipData, setToolTipData] = useState({});
    const [toolTipMapper, setToolTipMapper] = useState([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const toolTipRef = useRef<HTMLDivElement | null>(null);
    const toolTipDataRef = useRef<typeof vrfTooltipData | undefined>();
    const navigate = useNavigate();
    // console.log('State from SVG COmpo', currentState);

    const ElementId: Record<string, string> = {
        'VRF-VRV': 'g21',
        OCCUPANCY: 'layer1',
    };
    const getInactiveElement = () => {
        try {
            const inactiveElementId = ElementId[currentState === 'OCCUPANCY' ? 'VRF-VRV' : 'OCCUPANCY'];
            // console.log('Inactive Id', inactiveElementId);
            setInactiveGtagId(inactiveElementId);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClick = async (element: any) => {
        try {
            const mapper = currentState == 'VRF-VRV' ? vrfMapper : occupancyMapper;
            const id = element.srcElement.getAttribute('inkscape:label');
            let occupancyDeviceId = '';
            // console.log(
            //     'Mapper ',
            //     id,
            //     mapper,
            //     occupancyDeviceIds
            //     //  Object.keys(occupancyDeviceIds).includes(id)
            // );

            if (currentState !== 'VRF-VRV') occupancyDeviceId = occupancyDeviceIds[id];
            if (!id || !Object.keys(mapper).includes(id)) {
                // console.log('No id or id not in mapper');
                return;
            }
            const url =
                currentState === 'VRF-VRV' ? `/customer/vrv-vrf/device` : `/customer/occupancy/${occupancyDeviceId}`;
            if (currentState !== 'VRF-VRV' && !occupancyDeviceId) {
                // console.log(currentState !== 'VRF-VRV', 'No occupancy Id', occupancyDeviceId, occupancyDeviceIds[id]);
                return;
            }
            const deviceName = occupancyTooltipData
                ?.filter((doc: any) => doc.id === id)
                ?.map((doc: any) => doc.name)[0];
            // console.log('URL', id, deviceName);
            navigate(url, { state: { key: id, name: deviceName } });
        } catch (error) {
            console.log(error);
        }
    };

    const handleHover = throttle((e: any) => {
        try {
            const id = e.srcElement.getAttribute('inkscape:label');
            const mapper = currentState == 'VRF-VRV' ? vrfMapper : occupancyMapper;
            if (!id || !Object.keys(mapper).includes(id)) {
                return;
            }
            if (!containerRef.current) return;
            if (!id || !Object.keys(mapper).includes(id)) {
                return;
            }
            let values = containerRef.current.getBoundingClientRect();
            // let values = {};

            const position = {
                xValue: Math.abs(e.clientX - values.x),
                yValue: Math.abs(e.clientY - values.y),
            };
            // const toolTipMapper = currentState == 'VRF-VRV' ? vrfTooltipData : occupancyTooltipData;
            if (!toolTipDataRef || toolTipDataRef.current.length < 1) {
                // console.log('Noting in tooltip mapper', toolTipMapper, vrfTooltipData, occupancyTooltipData);
                return;
            }
            // console.log('Hower ID', id, vrfTooltipData, occupancyTooltipData);
            const dataToToolTip = toolTipDataRef?.current.filter((doc: any) => {
                return id === doc.id;
            });
            // console.log('Tool tip data', dataToToolTip);
            // if(currentState!=='VRF-VRV' )dataToToolTip.name=
            setToolTipData(dataToToolTip);
            setToolTipPosition(position);
            setShowToolTip(true);
        } catch (error) {
            console.log(error);
        }
    }, 500);

    const handleMouseOut = (e: any) => {
        try {
            // console.log('Mouse out');
            setShowToolTip(false);
        } catch (error) {
            console.log(error);
        }
    };
    const createMapObject = () => {
        try {
            const parser = new DOMParser();
            const svgDoc = parser?.parseFromString(svgData, 'image/svg+xml');
            const vrfComponent = svgDoc?.getElementById(ElementId['VRF-VRV']) as HTMLElement;

            const occupancyComponent = svgDoc?.getElementById(ElementId['OCCUPANCY']) as HTMLElement;
            if (!vrfComponent || !occupancyComponent) return;
            const rectVRF = vrfComponent.getElementsByTagName('rect');
            const rectOccupancy = occupancyComponent.getElementsByTagName('rect');
            // console.log('VRF rect', rectVRF, rectOccupancy);
            if (!rectVRF || !rectOccupancy) return;

            const rectElementsVRF = Array.from(rectVRF);
            const rectElementsOccupancy = Array.from(rectOccupancy);
            // console.log('VRF', rectElementsVRF);

            const vrfIds: Record<string, string> = {};
            const occupancyIds: Record<string, string> = {};
            for (const rect of rectElementsVRF) {
                const zoneId = rect.getAttribute('inkscape:label'); // Get the attribute value
                // console.log('Rect', zoneId);
                if (zoneId) {
                    vrfIds[zoneId] = rect.id;
                }
            }
            for (const rect of rectElementsOccupancy) {
                const zoneId = rect.getAttribute('inkscape:label'); // Get the attribute value
                if (zoneId) {
                    occupancyIds[zoneId] = rect.id;
                }
            }
            setVrfMapper(vrfIds);
            setOccupancyMapper(occupancyIds);
            // console.log('VRF mapper:', vrfIds, 'Occupancy mapper:', occupancyIds);
        } catch (error) {
            console.log(error);
        }
    };
    const createColorCodeMaps = async () => {
        try {
            if (!elementsToGreen || !elementsToRed || !vrfMapper || !occupancyMapper) {
                return;
            }
            const greenRects: { [key: string]: any } = {};
            const redRects: { [key: string]: any } = {};
            const mapperObject: { [key: string]: any } = currentState === 'VRF-VRV' ? vrfMapper : occupancyMapper;
            // console.log('Mapper object:', currentState, mapperObject, elementsToGreen);
            elementsToGreen.forEach((docId: any) => {
                greenRects[docId] = mapperObject[docId];
            });
            elementsToRed.forEach((docId: any) => {
                redRects[docId] = mapperObject[docId];
            });
            // console.log('Doc id', greenRects, redRects);
            setGreenElements(greenRects);
            setRedElements(redRects);
        } catch (error) {
            console.log(error);
        }
    };

    // Function which add event Listners
    const addEventListener = (
        ref: React.RefObject<HTMLElement>,
        event: keyof HTMLElementEventMap,
        executable: EventListenerOrEventListenerObject
    ) => {
        try {
            if (ref.current) {
                ref.current?.removeEventListener(event, executable);
                ref.current?.addEventListener(event, executable, true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const manipulateSvg = async () => {
        try {
            const parser = new DOMParser();
            const svgDoc = parser?.parseFromString(svgData, 'image/svg+xml');

            const gtagActive = svgDoc?.getElementById(ElementId[currentState]) as HTMLElement;
            const gtagInactive = svgDoc?.getElementById(inactiveGtagId) as HTMLElement;
            if (!gtagActive || !gtagInactive) return;
            gtagInactive.setAttribute('visibility', 'hidden');
            gtagActive.setAttribute('visibility', 'visible');
            // console.log('Greeen Rect:', redElements);
            //Changing elements to Green
            Object.values(greenElements)?.forEach((elementId: any) => {
                const element = gtagActive?.querySelector(`#${elementId}`) as HTMLElement;
                if (!element) return;
                return (element.style.fill = 'green');
            });
            // Changing elements to Red
            Object.values(redElements)?.forEach((elementId: any) => {
                const element = gtagActive?.querySelector(`#${elementId}`) as HTMLElement;
                if (!element) return;
                return (element.style.fill = 'red');
            });

            const updatedSvgContent = new XMLSerializer().serializeToString(svgDoc);
            setSvgdata(updatedSvgContent);
            return;
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const pullSVG = () => {
            try {
                fetch(
                    // 'https://res.cloudinary.com/dlcsyyk7z/image/upload/v1726041289/Trail/layoutOutputIdGaps_4_oocc31.svg'
                    'https://res.cloudinary.com/dlcsyyk7z/image/upload/v1726045792/Trail/layoutOutputIdGaps_4_ywg5qi.svg'
                )
                    .then((response) => response.text())
                    .then(async (svgContent) => {
                        const parser = new DOMParser();
                        const svgDoc = parser?.parseFromString(svgContent, 'image/svg+xml');
                        const svgElement = svgDoc?.getElementById('svg2') as HTMLElement;
                        // console.log('SvgPulled Data', svgContent);
                        if (!svgElement) return;
                        svgElement.setAttribute('width', '750');
                        svgElement.setAttribute('height', '440');
                        const updatedSvgContent = new XMLSerializer().serializeToString(svgDoc);

                        setSvgdata(updatedSvgContent);

                        return;
                    })
                    .catch((error) => {
                        console.error('Error fetching SVG:', error);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        pullSVG();
    }, []);
    useEffect(() => {
        createMapObject();
        addEventListener(containerRef, 'click', handleClick);
        addEventListener(containerRef, 'mouseover', handleHover);
        addEventListener(containerRef, 'mouseout', handleMouseOut);
    }, [svgData]);
    useEffect(() => {
        getInactiveElement();
        manipulateSvg();
    }, [svgData, currentState]);
    useEffect(() => {
        manipulateSvg();
    }, [inactiveGtagId, greenElements, redElements]);
    useEffect(() => {
        createColorCodeMaps();
    }, [vrfMapper, currentState, occupancyMapper, elementsToGreen, elementsToRed]);
    useEffect(() => {
        const toolTipMap = currentState === 'VRF-VRV' ? vrfTooltipData : occupancyTooltipData;
        // console.log('tool tip map:', toolTipMap);
        toolTipDataRef.current = toolTipMap;
    }, [currentState, vrfTooltipData, occupancyTooltipData]);

    return (
        <>
            {' '}
            <LayoutToolTip
                currentState={currentState}
                show={showToolTip}
                positionValues={toolTipPosition}
                layoutState={currentState}
                vrfTooltipData={vrfTooltipData}
                occupancyTooltipData={occupancyTooltipData}
                toolTipData={tooltipData}
            />
            <div ref={containerRef} style={{ padding: '10px' }}>
                {!isDataLoading && svgData ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: svgData ? svgData.toString() : '' }}
                        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                    />
                ) : (
                    <div style={{ marginTop: '100px', width: '95%', marginInline: '20px' }}>
                        <TableSkelton />
                    </div>
                )}
            </div>
        </>
    );
};
