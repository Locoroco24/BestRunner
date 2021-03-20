import styled from "@emotion/styled";


export const Table = styled.table`
        margin-top: 20px;
        width: 100%;
        border: 3px #222 solid;
        border-collapse: collapse;
        `

export const Th = styled.th`
        border: 3px #222 solid;
        padding: 5px 25px;
        color: #fff;
        background: linear-gradient(0deg, #555, #000);
        `

export const Td = styled.td`
        border: 2px #222 solid;
        padding: 5px 10px;
        background: #fff;
        text-align: center;
        `

export const Button = styled.button`
        position: relative;
        background: none;
        color: #fff;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        border: none;
        outline: none;
        transition: opacity .4s;
        &:hover {
            cursor: pointer;
            opacity: 0.75;
        }
        &.ascending {
            &:after {
                content: '\\2B07';
                position: absolute;
                right: -15px;
            }
        };
        &.descending {
            &:after {
                content: '\\2B06';
                position: absolute;
                right: -15px;
            }
        }
        &.addWorkout, &.closePopup  {
        max-width: 100%;
        width: 300px;
        padding: 5px 15px;
        text-transform: uppercase;
        }
        &.addWorkout {
        margin: 40px 0 15px;
        color: #fff;
        background: #000;
        }
        &.closePopup {
        margin-bottom: 15px;
        color: #222;
        background: #ddd;
        }
        &.editWorkout {
        color: #fff;
        background: #000;
        }
        `

export const H1 = styled.h1`
        margin-top: 30px;
        text-align: center;
        `

export const H2 = styled.h2`
        text-align: center;
        margin-bottom: 10px;
        `

export const H3 = styled.h3`
        text-align: center;
        margin: 25px 0 15px;
        `

export const P = styled.p`
        margin-right: 20px;
        `

export const Select = styled.select`
        padding: 5px 10px;
        &:hover {
        cursor: pointer;
        }
        `

export const Div = styled.div`
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &.workoutType {
        width: 300px;
        flex-direction: row;
        justify-content: space-between;
        }
        `