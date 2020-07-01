import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function Assess_form(props) {
    //const subtables = [[['subject', 'class 50%', 'Exams 50%', 'Total 100%', 'Position', 'Remarks'], ['maths'], ['eng']], [['total marks']], [['Conduct'], ['Attitude'], ["Class Teacher's Remarks"], ["Headmistress/ Headmaster's Remarks"]], [['Total Fees'], ['Arrears'], ['Credit'], ['Grand Total']]]
    const [subtables, setSubtables] = useState([])
    //holds each sub-table
    const parsed = []
    var takenScores = {}
    //hold the field values
    const [fieldValues, setFieldValues] = useState([])
    //holds the position of a value
    const [position, setPosition] = useState([])
    //holds the cookies
    const [cookies, setCookie] = useCookies(['info'])
    //has the structure of the report to be used
    const [report, setReport] = useState({
        id_student: cookies.info.student.id_student,
        id_reports_folder: props.match.params.reports_folder_id,
        scores: JSON.stringify({
            content: '[]',
            position: '[]'
        })
    })
    //tells if there has been changes made
    const [changed, setChanged] = useState(false)

    //get the default template
    axios.get('/default_template/' + cookies.info.staff.id_school + '/' + cookies.info.staff.level).then(({ data }) => {
        setSubtables(eval(data.definition))
    })

    useEffect(() => {
        //if (cookies.hasOwnProperty("info")) {
        // props.updateLog(cookies.info.loggedIn)
        // props.updateStaff(cookies.info.staff)
        // props.updateSchool(cookies.info.school)
        //}
        //get the student of a report

        axios.get('/report_student/' + props.match.params.report_id).then(({ data }) => {
            setReport({ ...report, id_student: data.id_student })
        })
        
        //get a particular report with that report id
        axios.get('/report/' + props.match.params.report_id).then(({ data }) => {
            //store the scores temporarily
            var tempo = JSON.parse(data.scores)
            //store the content temporarily
            var temp = eval(tempo.content)
            //load the field values
            setFieldValues(temp)
            //load the positions 
            setPosition(eval(tempo.position))
            setReport({ ...report, scores: data.scores })

            //load the values in their right places
            for (let i = 0; i < temp.length; i++) {
                document.getElementsByTagName("input")[i].value = temp[i]
            }
        })

    }, [])

    var numCols = 0

    //creates empty columns 
    const returnCols = (number, pos) => {
        const cols = []
        for (let i = 0; i < number; i++) {
            var colValue = pos.length > 1 ? pos[1][i + 1] : null
            cols.push(<td key={numCols}><input col={colValue} row={pos[0]} type="text" keys={numCols} onChange={handleChange} /></td>)
            takenScores = { ...takenScores, numCols }
            numCols++
        }
        return cols
    }
    //runs when value changes
    const handleChange = (event) => {
        setChanged(true)
        fieldValues[event.target.getAttribute("keys")] = event.target.value
        position[event.target.getAttribute("keys")] = [event.target.getAttribute("row"), event.target.getAttribute("col")]
        if (event.target.value == '') {
            position[event.target.getAttribute("keys")] = null
        }
        var value = { content: JSON.stringify(fieldValues), position: JSON.stringify(position) }
        setReport({ ...report, scores: JSON.stringify(value) })
    }

    //runs when the done button is clicked
    const handleClick = async () => {
        if (changed) {
            const response = await fetch('/report/' + props.match.params.report_id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(report)
            })
            if (response.ok) {
                props.history.push(props.location.pathname.split('/').slice(0, 5).join('/'))
            }

        }
        else {
            props.history.push(props.location.pathname.split('/').slice(0, 5).join('/'))
        }


    }

    //displaying subtables
    subtables.forEach(element => {
        var mul = 1
        var header = []
        parsed.push(
            <table border="1" bordercolor="black" cellPadding="2" cellSpacing="0">
                <tbody>{
                    element.map(rowArray => {
                        if (rowArray.length > 1) {
                            mul = rowArray.length - 1
                            header = rowArray
                            return (<tr>
                                {
                                    rowArray.map(rowElement =>
                                        <td
                                            key={rowElement}
                                            style={{
                                                fontWeight: "bold",
                                                backgroundColor: "#E4E4E4",
                                                textAlign: "center"
                                            }}>
                                            {rowElement}
                                        </td>
                                    )
                                }

                            </tr>)
                        } else {
                            if (mul > 1) {
                                return (<tr>
                                    {
                                        rowArray.map(rowElement =>
                                            <React.Fragment key={rowElement}>
                                                <td >
                                                    {rowElement}
                                                </td>
                                            </React.Fragment>
                                        )
                                    }
                                    {returnCols(mul, [rowArray, header])}
                                </tr>)
                            }
                            else {

                                return (<tr>
                                    {
                                        rowArray.map(rowElement =>
                                            <>
                                                <td
                                                    key={rowElement}
                                                    style={{
                                                        fontWeight: "bold",
                                                        backgroundColor: "#E4E4E4",
                                                        width: "15%"
                                                    }}>
                                                    {rowElement}
                                                </td>
                                            </>
                                        )
                                    }
                                    {returnCols(mul, [rowArray])}
                                </tr>)
                            }
                        }

                    }
                    )}
                </tbody>
            </table>
        )
    })

    
    return (
        <div>
            <div className="wrap">
                <div className="tables">
                    {parsed}
                    <button onClick={handleClick}>done</button>
                </div>
            </div>
        </div>
    )
}
