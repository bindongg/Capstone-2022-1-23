import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {  useNavigate, useParams } from "react-router-dom";
import { Token } from "../../Context/Token/Token";

function ReferenceDetail(props) {
    const {id} = useParams();
    const {token,setToken} = useContext(Token); 
    const [referenceDetail, setReferenceDetail] = useState({});
    const [preDetail, setPreDetail] = useState(null);
    const [nextDetail, setNextDetail] = useState(null);
    const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : token
    }
    const navigate = useNavigate();
    const buttonStyle = { marginLeft:"5px", fontSize:"14px"}

    useEffect( () => {
    const getReferenceDetail = async (nextSub, preSub) => {
        let referenceDetail = await axios.get(`http://localhost:8080/reference/${id}`, {headers : headers});
        referenceDetail = referenceDetail.data.data
        // console.log(referenceDetail);
        setReferenceDetail({...referenceDetail.ref});
        setNextDetail(referenceDetail.nextRef && {...referenceDetail.nextRef});
        setPreDetail(referenceDetail.preRef && {...referenceDetail.preRef});
        }    
        getReferenceDetail(nextDetail, preDetail);
    }, [id]);

    const goPre = () => {
        navigate(`/reference/${preDetail.id}`);
    }
    const goNext = () => {
        navigate(`/reference/${nextDetail.id}`);
    }


    return (
        <>
            <div className="col-8 mx-auto m-3 p-2">
                <br/>
                <h1>{referenceDetail.name}</h1>
            </div>
            <div className="col-8 mx-auto border-top border-bottom m-3 p-2"
            dangerouslySetInnerHTML={{__html: referenceDetail.content}}>
            </div> {/*TODO: 마크다운으로 받도록 수정*/}
            <br/>
            <div className="col-8 mx-auto">
                <div className=" nav justify-content-between">
                    {preDetail ? <Button style={buttonStyle} onClick={goPre}>Prev</Button> : <Button variant="secondary" style={buttonStyle} disabled>Prev</Button>}
                    {nextDetail ? <Button style={buttonStyle} onClick={goNext}>Next</Button> : <Button variant="secondary" style={buttonStyle} disabled>Next</Button>}
                </div>
            </div>
        </>
    );
}

export default ReferenceDetail;
