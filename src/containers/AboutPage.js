import React from "react";

class AboutPage extends React.Component {

  render() {
    const styles = {
      about: {
        display: "grid",
        justifyContent: "center",
      },
      title: {
        paddingTop: "50px",
        paddingBottom: "30px",
        textAlign: "center",
        fontSize: "36px"
      },
      version: {
        display: "flex",
        justifyContent: "center",
        fontSize: "24px",
        color: "darkcyan",
      },
      desc: {
        padding: "0px 50px",
        fontSize: "20px"
      }
    }
    return (
      <div style={styles.about}>
        <div style={styles.title}><b>Sobre</b></div>

        <div style={styles.version}>CRM For Apple</div>

        <div style={styles.desc}>
          <p>Crm Developed for Inventory Management for Apple Products</p>
          <p>By Diogo Guedes</p>
        </div>
      </div>
    );
  }
}

export default AboutPage;
