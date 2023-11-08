import React from "react";

const contactInfo = {
    name: "FPT University",
    email: "daihoc.hcm@fpt.edu.vn",
    phone: "(028) 7300 5588",
    address: "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh",
};

export default function Contact() {
    return (
        <div style={{textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h1 style={{ fontSize: "40px", textAlign: "center" }}>Contact Us</h1>
            <div style={{ textAlign: "center" }}>
                <p>If you have any questions or need assistance, please feel free to contact us:</p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
                <li>
                    <strong>Name:</strong> {contactInfo.name}
                </li>
                <li>
                    <strong>Email:</strong> {contactInfo.email}
                </li>
                <li>
                    <strong>Phone:</strong> {contactInfo.phone}
                </li>
                <li>
                    <strong>Address:</strong> {contactInfo.address}
                </li>
            </ul>
        </div>
    );
}
