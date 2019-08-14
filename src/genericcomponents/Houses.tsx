import * as React from "react"
import brobnarImg from "../images/houses/brobnar.png"
import disImg from "../images/houses/dis.png"
import logosImg from "../images/houses/logos.png"
import marsImg from "../images/houses/mars.png"
import sanctumImg from "../images/houses/sanctum.png"
import shadowsImg from "../images/houses/shadows.png"
import untamedImg from "../images/houses/untamed.png"
import { House } from "../shared/keyforge/house/House"

export const Houses = (props: {houses: House[], style?: React.CSSProperties}) => (
    <div style={{display: "flex", justifyContent: "space-evenly", ...props.style}}>
        {props.houses.map(house => (
            <img
                src={houseValues.get(house)!.img}
                style={{width: 48, height: 48}}
            />
        ))}
    </div>
)

export interface HouseValue {
    house: House
    img: string
}

export const houseValuesArray: HouseValue[] = [
    {
        house: House.Brobnar,
        img: brobnarImg,
    },
    {
        house: House.Dis,
        img: disImg
    },
    {
        house: House.Logos,
        img: logosImg
    },
    {
        house: House.Mars,
        img: marsImg
    },
    {
        house: House.Sanctum,
        img: sanctumImg
    },
    {
        house: House.Shadows,
        img: shadowsImg
    },
    {
        house: House.Untamed,
        img: untamedImg
    },
]

export const houseValues: Map<House, HouseValue> = new Map(houseValuesArray.map(houseValue => (
    [houseValue.house, houseValue] as [House, HouseValue]
)))
