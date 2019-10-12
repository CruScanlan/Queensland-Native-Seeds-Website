import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
import {withStyles} from '@material-ui/core/styles';
import { graphql, Link, navigate } from "gatsby";
import Layout from 'components/Layout.jsx';
import SEO from 'components/SEO/SEO.jsx';
import withRoot from '../withRoot';
import queryString from 'query-string';

import ParallaxHeader from "components/Parallax/ParallaxHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Badge from "components/Badge/Badge.jsx";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomMultiSelect from "components/CustomSelect/CustomMultiSelect.jsx";
import IconArrowDropDown from "@material-ui/icons/ArrowDropDown";
import IconArrowDropUp from "@material-ui/icons/ArrowDropUp";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconSearch from "@material-ui/icons/Search";

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

        const queryParams = queryString.parse(props.location.search);

        this.state = {
            categoriesSelected: queryParams.categories ? queryParams.categories.split(',') : []
        }

        this.handleSearchCommonNameCheckbox = this.handleSearchCommonNameCheckbox.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    handleSelectorChange = event => {
        this.setState({ categoriesSelected: event.target.value });
        const queryParams = queryString.parse(this.props.location.search);
        navigate(`/plant-profiles?search=${queryParams.search || ''}&categories=${event.target.value.join(',')}&searchByCommonName=${queryParams.searchByCommonName || 'false'}&sortingColumn=${queryParams.sortingColumn || 'scientificName'}&sortingAZ=${queryParams.sortingAZ || 'true'}`, {replace: true})
    };

    handleSearchCommonNameCheckbox(event) {
        const queryParams = queryString.parse(this.props.location.search);
        navigate(`/plant-profiles?search=${queryParams.search || ''}&categories=${queryParams.categories || ''}&searchByCommonName=${event.target.checked}&sortingColumn=${queryParams.sortingColumn || 'scientificName'}&sortingAZ=${queryParams.sortingAZ || 'true'}`, {replace: true});
    }

    handleSearchChange(event) {
        const searchValue = event.target.value;
        const queryParams = queryString.parse(this.props.location.search);
        navigate(`/plant-profiles?search=${searchValue}&categories=${queryParams.categories || ''}&searchByCommonName=${queryParams.searchByCommonName || 'false'}&sortingColumn=${queryParams.sortingColumn || 'scientificName'}&sortingAZ=${queryParams.sortingAZ || 'true'}`, {replace: true})
    }

    handleSortChange(columnName) {
        const queryParams = queryString.parse(this.props.location.search);
        if(queryParams.sortingAZ === undefined) queryParams.sortingAZ = 'true';
        if(queryParams.sortingColumn && columnName === queryParams.sortingColumn) return navigate(`/plant-profiles?search=${queryParams.search || ''}&categories=${queryParams.categories || ''}&searchByCommonName=${queryParams.searchByCommonName || 'false'}&sortingColumn=${queryParams.sortingColumn || 'scientificName'}&sortingAZ=${!(queryParams.sortingAZ === 'true')}`, {replace: true});
        navigate(`/plant-profiles?search=${queryParams.search || ''}&categories=${queryParams.categories || ''}&searchByCommonName=${queryParams.searchByCommonName || 'false'}&sortingColumn=${columnName}&sortingAZ=true`, {replace: true});
    }

    createBadges(list, color) {
        if(!list) return <div></div>
        return list.map(item => (
            <Badge color={color} key={item.name}>
                {item.name}
            </Badge>
        ))
    }

    sortAlphabetical(array, objectProperty) {
        return array.sort((a, b) => {
            const textA = objectProperty ? a[objectProperty].toLowerCase() : a.toLowerCase();
            const textB = objectProperty ? b[objectProperty].toLowerCase() : b.toLowerCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
    }

    sortPlantProfiles(plantProfiles, queryParams) {
        const sortSettings = {
            columnName: queryParams.sortingColumn ? queryParams.sortingColumn : 'scientificName',
            directionAZ: queryParams.sortingAZ ? queryParams.sortingAZ : 'true'
        }
        if(sortSettings.columnName === "categories") {
            plantProfiles.sort((a, b) => {
                const textA = a.categories ? a.categories.map(category => category.name).join('').toLowerCase() : 'zzzzz';
                const textB = b.categories ? b.categories.map(category => category.name).join('').toLowerCase() : 'zzzzz';
                if(sortSettings.directionAZ === 'true') return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        } else {
            plantProfiles.sort((a, b) => {
                const textA = a[sortSettings.columnName] === "" ? 'zzzzz' : a[sortSettings.columnName].toLowerCase();
                const textB = b[sortSettings.columnName] === "" ? 'zzzzz' : b[sortSettings.columnName].toLowerCase();
                if(sortSettings.directionAZ == 'true') return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        }

        return plantProfiles;
    }

    filteredPlantProfiles(data, queryParams) {
        const searchQuery = queryParams.search ? queryParams.search.toLowerCase() : ''; //get lower case search query
        const plantProfiles = data.allContentfulPlantProfile.edges.map(plantProfile => {
            const newPlantProfile = plantProfile.node; //remove node wrapper
            if(Array.isArray(newPlantProfile.commonName)) newPlantProfile.commonName = newPlantProfile.commonName.join(', '); //if common name is an array, join
            else if(typeof newPlantProfile.commonName !== 'string') newPlantProfile.commonName = ''; //common name not defined
            if(newPlantProfile.categories) newPlantProfile.categories = this.sortAlphabetical(newPlantProfile.categories, 'name')
            return newPlantProfile;
        }) //remove node object and join common names
        const plantProfilesNameFiltered = plantProfiles.filter(plantProfile => queryParams.searchByCommonName === "true" ? plantProfile.commonName.toLowerCase().includes(searchQuery) : plantProfile.scientificName.toLowerCase().includes(searchQuery)); //filter by right name type
        const plantProfilesCategoriesFiltered = plantProfilesNameFiltered.filter(plantProfile => {
            if(!queryParams.categories) return true; //no categories to search defined, return all
            const searchCategoriesArray = queryParams.categories.split(',')  //make array
            if(!plantProfile.categories) return false; //not defined, do not include
            return plantProfile.categories.some(val => searchCategoriesArray.indexOf(val.name) >= 0); //return true if a value matches in both arrays
        })
        return plantProfilesCategoriesFiltered;
    }

    render() {
        const {classes, data, location} = this.props;
        const queryParams = queryString.parse(location.search);
        const searchQuery = queryParams.search ? queryParams.search.toLowerCase() : '';
        
        const plantProfilesFiltered = this.sortPlantProfiles(this.filteredPlantProfiles(data, queryParams), queryParams);
        const plantProfileResultsCount = plantProfilesFiltered.length;

        const plantProfileRows = plantProfilesFiltered.map(plantProfile => {
            return (
                <Link to={`/plant-profiles/${plantProfile.slug}`} style={{textDecoration: "inherit", color: 'inherit'}} className={classes.tableRow}>
                    <td className={classNames(classes.tableCell, classes.scientificName)}>
                        {plantProfile.scientificName}
                    </td>
                    <td className={classes.tableCell}>
                        {plantProfile.commonName}
                    </td>
                    <td className={classes.tableCellLast}>
                        {this.createBadges(plantProfile.categories, 'green')}
                    </td>
                </Link>
            )
        })

        return (
            <>
                <SEO 
                        pathname="/plant-profiles"
                        title="Plant Profiles"
                        image={data.backgroundImage.childImageSharp.fluid.src}/>
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
                                        <GridContainer>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <CustomInput
                                                    labelText="Search"
                                                    value={searchQuery}
                                                    onChange={this.handleSearchChange}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconSearch />
                                                        </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={3} md={3}>
                                                <CustomMultiSelect
                                                    labelText=" Show Categories"
                                                    value={this.state.categoriesSelected}
                                                    onChange={this.handleSelectorChange}
                                                    menuItems={this.sortAlphabetical(data.allPlantCategories.edges.map(plantCategory => plantCategory.node.name))}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={3} md={3} style={{display: 'inline-flex'}}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                        checked={queryParams.searchByCommonName === "true" | false}
                                                        onChange={this.handleSearchCommonNameCheckbox}
                                                        classes={{
                                                            root: classes.searchCommonNameCheckbox
                                                        }}
                                                        />
                                                    }
                                                    label="Search by Common Name"
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} style={{marginLeft: '20px', marginRight: '20px'}}>
                                        <p className={classes.results}>{plantProfileResultsCount} Results</p>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} style={{marginTop: 20, marginLeft: '20px', marginRight: '20px'}}>
                                        <table className={classes.table}>
                                            <thead className={classes.tableHeader}>
                                                <tr className={classes.tableHeaderRow}>
                                                    <th className={classes.tableHeaderColumn} onClick={() => this.handleSortChange('scientificName')}>
                                                    Scientific Name 
                                                    <div className={classes.tableArrowArea}>
                                                            <IconArrowDropUp className={classNames(classes.tableArrowIcon, {
                                                                [classes.tableArrowIconSelected]: queryParams.sortingColumn === 'scientificName' && queryParams.sortingAZ === 'true'
                                                            })} viewBox="6 6 12 12"/>
                                                            <IconArrowDropDown className={classNames(classes.tableArrowIcon, {
                                                                [classes.tableArrowIconSelected]: queryParams.sortingColumn === 'scientificName' && queryParams.sortingAZ === 'false'
                                                            })} viewBox="6 6 12 12"/>
                                                    </div>
                                                    </th>
                                                    <th className={classes.tableHeaderColumn} onClick={() => this.handleSortChange('commonName')}>
                                                        Common Name 
                                                        <div className={classes.tableArrowArea}>
                                                            <IconArrowDropUp className={classNames(classes.tableArrowIcon, {
                                                                [classes.tableArrowIconSelected]: queryParams.sortingColumn === 'commonName' && queryParams.sortingAZ === 'true'
                                                            })} viewBox="6 6 12 12"/>
                                                            <IconArrowDropDown className={classNames(classes.tableArrowIcon, {
                                                                [classes.tableArrowIconSelected]: queryParams.sortingColumn === 'commonName' && queryParams.sortingAZ === 'false'
                                                            })} viewBox="6 6 12 12"/>
                                                    </div>
                                                    </th>
                                                    <th className={classes.tableHeaderColumn} onClick={() => this.handleSortChange('categories')}>
                                                        Categories
                                                        <div className={classes.tableArrowArea}>
                                                            <IconArrowDropUp className={classNames(classes.tableArrowIcon, {
                                                                [classes.tableArrowIconSelected]: queryParams.sortingColumn === 'categories' && queryParams.sortingAZ === 'true'
                                                            })} viewBox="6 6 12 12"/>
                                                            <IconArrowDropDown className={classNames(classes.tableArrowIcon, {
                                                                [classes.tableArrowIconSelected]: queryParams.sortingColumn === 'categories' && queryParams.sortingAZ === 'false'
                                                            })} viewBox="6 6 12 12"/>
                                                    </div>
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
            </>
        )
    }
}

export const query = graphql`
    query PlantProfileIndexQuery {
        backgroundImage: file(relativePath: { eq: "bg25.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 2000, quality: 45) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        },
        allPlantCategories: allContentfulPlantCategory {
            edges {
                node {
                    name
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