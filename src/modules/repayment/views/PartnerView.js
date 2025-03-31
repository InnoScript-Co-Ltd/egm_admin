import moment from "moment";
import { Card } from "primereact/card"
import { useEffect, useState } from "react"
import { Status } from "../../../shares/Status";
import { Badge } from "primereact/badge";
import { Image } from "primereact/image";
import { endpoints } from "../../../constants/endpoints";
import numeral from "numeral";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const PartnerView = ({dataSource}) => {

    const [partner, setPartner] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(dataSource) {
            setPartner(dataSource);
        }
    }, [dataSource]);

    return(
        <div className="col-12">
            { partner && (
                <Card
                    title="Partner Information"
                >
                    <div className="grid">
                        <div className="col-12 py-3">
                            <div className="flex flex-row justify-content-between align-items-start py-1">
                                <div>
                                    <Badge size="sm" severity={"success"} value={`Created At - ${moment(partner.created_at).format("DD-MM-YYYY hh:mm:ss A")}`} />
                                    <Badge className="ml-3" size="sm" severity={"success"} value={`Updated At - ${moment(partner.updated_at).format("DD-MM-YYYY hh:mm:ss A")}`} />
                                </div>

                                <div className="flex flex-row justify-content-start align-items-start">
                                    <div className="mr-3">
                                        <Status status={partner.kyc_status} />
                                    </div>
                                    
                                    <Status status={partner.status} />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 p-3">
                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> ID </span>
                                <span> #{partner.id} </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> Username </span>
                                <span> {partner.username} </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> Reward Points </span>
                                <span> {numeral(partner.point).format("0,0")} Pts </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> Name </span>
                                <span> {partner.first_name} {partner.last_name} </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> DOB </span>
                                <span> {moment(partner.dob).format("DD-MM-YYYY")} </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> NRC </span>
                                <span> {partner.nrc} </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> Email </span>
                                <span> {partner.email} </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> Phone Number </span>
                                <span> {partner.prefix} {partner.phone} </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> Address </span>
                                <span> {partner.address} </span>
                            </div>

                            <div className="flex flex-row justify-content-between align-items-start py-2">
                                <span> ROI </span>
                                <span> {partner.roi} % </span>
                            </div>

                            <div className="flex flex-row justify-content-end align-items-start py-2">
                                <Button className="mt-3" onClick={() => navigate(`/${endpoints.partner}/${partner.id}`) }> Edit Partner </Button>
                            </div>
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 p-3">
                            <h3> NRC Front </h3>
                            <Image className="mt-3" src={`${endpoints.image}/${partner.nrc_front}`} preview  />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 p-3">
                            <h3> NRC Back </h3>
                            <Image className="mt-3" src={`${endpoints.image}/${partner.nrc_back}`} preview  />
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}