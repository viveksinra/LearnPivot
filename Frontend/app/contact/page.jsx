import "./contactStyle.css";
import Header from "../Components/Header1/Header";
import { TopAbstract } from "../MyApp";
import Enquiry from "../Components/Enquiry/Enquiry";
import {NewFooter} from "../Components/Footer/Footer";
function Contact() {
  return (
    <main style={{backgroundColor:"#fff"}}>
    <Header/>
    <TopAbstract/>
    <Enquiry/>
    <NewFooter/>
    </main>
  )
}

export default Contact