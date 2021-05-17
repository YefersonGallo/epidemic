import React, {useState} from 'react';
import './App.css';
import {Grommet, Header, Anchor, Main} from 'grommet';
import {deepFreeze} from "grommet/utils"
import img from './infection.svg'
import {Button, Dialog, ListItem, majorScale, Pane, Text, TextInputField, TickIcon, UnorderedList} from "evergreen-ui";

export const customTheme = deepFreeze(
    {
        "global": {
            "colors": {
                "active": {
                    "0": "r",
                    "1": "g",
                    "2": "b",
                    "3": "a",
                    "4": "(",
                    "5": "2",
                    "6": "2",
                    "7": "1",
                    "8": ",",
                    "9": "2",
                    "10": "2",
                    "11": "1",
                    "12": ",",
                    "13": "2",
                    "14": "2",
                    "15": "1",
                    "16": ",",
                    "17": "0",
                    "18": ".",
                    "19": "5",
                    "20": ")",
                    "light": "#f50057",
                    "dark": "#ff4081"
                },
                "brand": "#000000",
                "control": {
                    "dark": "#f8f8f8",
                    "light": "#444444"
                },
                "focus": "#2AD2C9",
                "accent-1": "#2AD2C9",
                "accent-2": "#FFC107",
                "accent-3": "#9C27B0",
                "accent-4": "#673AB7",
                "neutral-1": "#795548",
                "neutral-2": "#009688",
                "neutral-3": "#8BC34A",
                "neutral-4": "#CDDC39",
                "status-critical": "#FF4081",
                "status-error": "#F44336",
                "status-warning": "#FFEB3B",
                "status-ok": "#4CAF50",
                "status-unknown": "#9E9E9E",
                "status-disabled": "#9E9E9E"
            },
            "control": {
                "border": {
                    "radius": "0px"
                }
            },
            "drop": {
                "background": "#2a2a2a"
            },
            "focus": {
                "border": {
                    "color": "#f50057"
                }
            },
            "hover": {
                "background": {
                    "dark": "#ff4081",
                    "light": "#f50057"
                }
            }
        },
        "anchor": {
            "color": {
                "dark": "#ff4081",
                "light": "#f50057"
            }
        },
        "button": {
            "border": {
                "radius": "0px"
            }
        },
        "checkBox": {
            "check": {
                "radius": "0px"
            }
        },
        "layer": {
            "background": "#444444"
        }
    }
)


function App() {
    const [n, setN] = useState<number>(100)
    const [t, setT] = useState<number>(500)
    const [pMask, setPMask] = useState<number>(80)
    const [pInfected, setPInfected] = useState<number>(10)
    const [pCMaskNot, setPCMaskNot] = useState<number>(10)
    const [pCMaskMask, setPCMaskMask] = useState<number>(1)
    const [pCNotMask, setPCNotMask] = useState<number>(15)
    const [pcNotNot, setPCNotNot] = useState<number>(30)
    const [pDead, setPDead] = useState<number>(20)
    const [mu, setMu] = useState<number>(200)
    const [sigma, setSigma] = useState<number>(50)
    const [info, setInfo] = useState<boolean>(false)
    const [flag, setFlag] = useState<boolean>(true)
    const [gif, setGif] = useState<boolean>(false)
    const [report1, setReport1] = useState<boolean>(false)
    const [report2, setReport2] = useState<boolean>(false)
    const [images, setImages] = useState<{
        gif: string, mask_report: string, general_report: string, recovery: number, deaths: number, infected: number, mask: number, not_mask: number, mask_infected: number,
        mask_not_infected: number
    }>()

    const sendInfo = async () => {
        setInfo(true)
        setFlag(true)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "n": n,
                "t": t,
                "p_mask": pMask / 100,
                "p_infected": pInfected / 100,
                "p_c_mask_not": pCMaskNot / 100,
                "p_c_mask_mask": pCMaskMask / 100,
                "p_c_not_mask": pCNotMask / 100,
                "p_c_not_not": pcNotNot / 100,
                "p_dead": pDead / 100,
                "mu": 200,
                "sigma": 50
            })
        };
        const response = await fetch('http://localhost:5000/gif', requestOptions)
        const res = await response.json();
        setImages(res)
        setInfo(false)
        setFlag(false)
    }

    return (
        <Grommet theme={customTheme}>
            <Header background="background-back" pad="large" height="small">
                <Anchor
                    href="/"
                    icon={<img src={img} alt="" width={140}/>}
                    label="Simulación de una Epidemia"
                    size={'xlarge'}
                />
            </Header>
            <Main pad="small">
                <Pane display="flex" flexDirection={"column"} marginX={majorScale(5)}>
                    <Text size={600}>El presente trabajo tiene como finalidad realziar la simulación de la propagación
                        de una
                        epidemia de una enfermedad respiratoria en un área específica y así poder ver el comportamiento
                        de la misma teniendo en cuenta variables como:</Text>
                    <UnorderedList icon={TickIcon} iconColor="success">
                        <ListItem>
                            Población
                        </ListItem>
                        <ListItem>
                            Tiempo de simulación
                        </ListItem>
                        <ListItem>
                            Tasa de contagio
                        </ListItem>
                        <ListItem>
                            Tasa de mortalidad
                        </ListItem>
                        <ListItem>
                            Tasa de infección
                        </ListItem>
                    </UnorderedList>
                </Pane>
                <Pane display="flex" flexDirection={"row"} marginLeft={"5%"}>
                    <Pane hidden={!flag}>
                        A continuación ingrese los datos según las instrucciones de cada paso:
                        <Pane display={"flex"} flexWrap={"wrap"}>
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Personas"
                                hint="Es un número entero correspondiente a las personas a representar en la simulación"
                                placeholder="Número de personas"
                                value={n}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setN(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Tiempo"
                                hint="Es un número entero correspondiente a las unidades tiempo a simular"
                                placeholder="Tiempo de simulación"
                                value={t}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setT(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Uso de mascarilla"
                                hint="Es un número entero entre 1 y 100 correspondiente a la probabilidad de que las personas usen mascarilla"
                                placeholder="Probabilidad del uso de mascarilla"
                                value={pMask}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPMask(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Inicio de contagio"
                                hint="Es un número entero entre 1 y 100 correspondiente a la probabilidad que tienen las personas de iniciar la simualción contagiadas"
                                placeholder="Probabilidad de iniciar contagiado"
                                value={pInfected}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPInfected(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Contagio sin uso de mascarilla"
                                hint="Es un número entero entre 1 y 100 correspondiente a la probabilidad de contagio cuando nadie usa mascarilla"
                                placeholder="Probabilidad del contagio sin el uso de mascarilla"
                                value={pcNotNot}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPCNotNot(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Contagio con uso de mascarilla (Contagiado)"
                                hint="Es un número entero entre 1 y 100 correspondiente a la probabilidad de contagio cuando un contagiado usa mascarilla y los demás no la usan"
                                placeholder="Probabilidad del contagio con uso de mascarilla por parte de un contagiado"
                                value={pCMaskNot}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPCMaskNot(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Contagio con uso de mascarilla grupal"
                                hint="Es un número entero entre 1 y 100 correspondiente a la probabilidad de contagio cuando una persona contagiada no usa mascarilla y las demás sí"
                                placeholder="Probabilidad del contagio con uso de mascarilla grupal"
                                value={pCNotMask}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPCNotMask(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Contagio con uso de mascarilla"
                                hint="Es un número entero entre 1 y 100 correspondiente a la probabilidad de contagio cuando todos en general usan mascarilla"
                                placeholder="Probabilidad del contagio con uso de mascarilla"
                                value={pCMaskMask}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPCMaskMask(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Probabilidad de muerte"
                                hint="Es un número entero entre 1 y 100 correspondiente a la probabilidad de muerte luego del contagio"
                                placeholder="Probabilidad del muerte"
                                value={pDead}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPDead(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Media del virus"
                                hint="Es un número entero correspondiente a la media respecto al tiempo que dura el virus en cada persona"
                                placeholder="Media de tiempo del virus"
                                value={mu}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setMu(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <TextInputField
                                width={"13%"}
                                marginRight={"2%"}
                                disabled={info}
                                label="Sigma del virus"
                                hint="Es un número entero correspondiente al sigma respecto al tiempo que dura el virus en cada persona"
                                placeholder="Sigma de tiempo del virus"
                                value={sigma}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setSigma(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}
                            />
                            <Button marginRight={12} height={56} appearance="primary" intent="none" isLoading={info}
                                    onClick={() => {
                                        sendInfo()
                                    }}>
                                Iniciar simulación
                            </Button>
                        </Pane>
                    </Pane>
                    <Pane hidden={flag}>
                        {
                            images && <Pane display="flex" flexDirection={"column"} marginTop={"5%"} alignItems={"center"} marginLeft={"40%"} width={"40vw"}>
                                <Text size={600}>Luego de la simulación se obtienen los siguientes resultados:</Text>
                                <UnorderedList icon={TickIcon} iconColor="success">
                                    <ListItem>
                                        Se recuperaron {images.recovery} personas.
                                    </ListItem>
                                    <ListItem>
                                        Se murieron {images.deaths} personas.
                                    </ListItem>
                                    <ListItem>
                                        Se contagiaron {images.infected} personas.
                                    </ListItem>
                                    <ListItem>
                                        Hubo {images.mask} que usaron mascarilla.
                                    </ListItem>
                                    <ListItem>
                                        Hubo {images.not_mask} que no usaron mascarilla.
                                    </ListItem>
                                    <ListItem>
                                        Se contagiaron {images.mask_infected} personas que usaban mascarilla
                                    </ListItem>
                                    <ListItem>
                                        Se contagiaron {images.mask_not_infected} personas que no usaban mascarilla.
                                    </ListItem>
                                </UnorderedList>
                                <Pane display="flex" flexWrap="wrap">
                                    <Pane>
                                        <Dialog
                                            isShown={gif}
                                            title="Simulación"
                                            onCloseComplete={() => setGif(false)}
                                            hasFooter={false}
                                            width={"55vw"}
                                        >
                                            <img src={`data:image/gif;base64,${images.gif}`} alt="Simulación"
                                                 className={"gif"}/>
                                        </Dialog>

                                        <Button marginRight={16} height={56}
                                                onClick={() => setGif(true)}>Ver simulación</Button>
                                    </Pane>
                                    <Pane>
                                        <Dialog
                                            isShown={report1}
                                            title="Comportamiento de los contagios"
                                            onCloseComplete={() => setReport1(false)}
                                            hasFooter={false}
                                            width={"35vw"}
                                        >
                                            <img src={`data:image/png;base64,${images.general_report}`} alt="Reporte1"
                                                 className={"image"}/>
                                        </Dialog>

                                        <Button marginRight={16} height={56} appearance="primary" intent="success"
                                                onClick={() => setReport1(true)}>Ver reporte 1</Button>
                                    </Pane>
                                    <Pane>
                                        <Dialog
                                            isShown={report2}
                                            title="Infección con mascarillas"
                                            onCloseComplete={() => setReport2(false)}
                                            hasFooter={false}
                                            width={"35vw"}
                                        >
                                            <img src={`data:image/png;base64,${images.mask_report}`} alt="Reporte2"
                                                 className={"image"}/>
                                        </Dialog>

                                        <Button marginRight={16} height={56} appearance="primary" intent="danger"
                                                onClick={() => setReport2(true)}>Ver reporte 2</Button>
                                    </Pane>
                                </Pane>
                                <Button marginRight={12} marginTop={"5%"} height={56} appearance="primary" intent="none" isLoading={info}
                                        onClick={() => {
                                            setFlag(true)
                                        }}>
                                    Nueva simulación
                                </Button>
                            </Pane>
                        }
                    </Pane>
                </Pane>
            </Main>
        </Grommet>
    );
}

export default App;
