import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import {withStyles} from '@material-ui/core/styles';
import { graphql, Link } from "gatsby";
import Layout from 'components/Layout.jsx';
import withRoot from '../withRoot';

import ParallaxHeader from "components/Parallax/ParallaxHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Badge from "components/Badge/Badge.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import IconArrowDropDown from "@material-ui/icons/ArrowDropDown";

import { cardTitle } from "assets/material-kit-react.jsx";
import landingPageStyle from "assets/views/landingPage.jsx";
import plantProfileIndexStyle from "assets/views/plantProfileIndexStyle.jsx";

const styles = {
    cardTitle,
    ...landingPageStyle,
    ...plantProfileIndexStyle
}

class PlantProfiles extends React.Component {
    constructor(props) {
        super(props);


    }

    createBadges(list, color) {
        if(!list) return <div></div>
        return list.map(item => (
            <Badge color={color} key={item.name}>
                {item.name}
            </Badge>
        ))
    }

    render() {
        const {classes, data} = this.props;

        const plantProfileRows = data.allContentfulPlantProfile.edges.map(plantProfile => {
            return (
                <Link to={`/plant-profiles/${plantProfile.node.slug}`} style={{textDecoration: "inherit", color: 'inherit'}} className={classes.tableRow}>
                    <td className={classes.tableCell}>
                        {plantProfile.node.scientificName}
                    </td>
                    <td className={classes.tableCell}>
                        {plantProfile.node.commonName ? plantProfile.node.commonName.join(', ') : ''}
                    </td>
                    <td className={classes.tableCellLast}>
                        {this.createBadges(plantProfile.node.categories, 'green')}
                    </td>
                </Link>
            )
        })

        return (
            <Layout>
                <ParallaxHeader filter medium image={data.backgroundImage.childImageSharp.fluid}/>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.pageContainer}>
                        <div className={classes.section}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={12}>
                                    <h2 className={classes.pageTitle}>Plant Profiles</h2>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{marginTop: 30, marginLeft: '20px', marginRight: '20px'}}>
                                    <CustomInput
                                            labelText="Search" 
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{marginTop: 20, marginLeft: '20px', marginRight: '20px'}}>
                                    <table className={classes.table}>
                                        <thead className={classes.tableHeader}>
                                            <tr className={classes.tableHeaderRow}>
                                                <th className={classes.tableHeaderColumn}>
                                                   Scientific Name <IconArrowDropDown className={classes.tableArrowIcon}/>
                                                </th>
                                                <th className={classes.tableHeaderColumn}>
                                                    Common Name <IconArrowDropDown className={classes.tableArrowIcon}/>
                                                </th>
                                                <th className={classes.tableHeaderColumn}>
                                                    Categories <IconArrowDropDown className={classes.tableArrowIcon}/>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className={classes.tableBody}>
                                            {plantProfileRows}
                                        </tbody>
                                    </table>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export const query = graphql`
    query PlantProfileIndexQuery {
        backgroundImage: file(relativePath: { eq: "bg1.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920, quality: 45) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        allContentfulPlantProfile {
            edges {
              node {
                scientificName,
                slug
                commonName,
                categories {
                    name
                }
              }
            }
          }
    }
`;

export default withRoot(withStyles(styles)(PlantProfiles));