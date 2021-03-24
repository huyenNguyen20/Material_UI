import { Header } from './ui/Header';
import { Footer } from './ui/Footer';
import { Landing } from './Landing';
import { Services } from './Services';
import { CustomDev } from './CustomDev';
import { ContactUs } from './ContactUs';
import { Misc } from './Misc';
import { Estimate } from './Estimate';

import { ThemeProvider } from '@material-ui/styles';
import {theme} from './ui/Theme';
import {BrowserRouter, Switch, Route} from '../../node_modules/react-router-dom';
import React, {useState, useEffect} from 'react';

function App() {
  const [value, setValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}> 
      <Header 
      value={value} 
      setValue={setValue}
      selectedItem={selectedItem} 
      setSelectedItem={setSelectedItem}
      />
        <Switch>
          <Route exact path="/" component={props => 
                <Landing {...props} value={value} setValue={setValue}/>} />
          <Route path="/services" component={props => 
                <Services {...props} value={value} setValue={setValue}/>} />
          <Route path="/custom" component={props => 
                <CustomDev {...props} setValue={setValue} setSelectedItem={setSelectedItem}/>} />
          <Route path="/mobile" component={() => (<div style={{height: "1000px"}}>Mobile Dev</div>)} />
          <Route path="/web" component={() => (<div style={{height: "1000px"}}>Web Dev</div>)} />
          <Route path="/revolution" component={() => (<div style={{height: "1000px"}}>Revolution</div>)} />
          <Route path="/aboutus" component={props => <Misc {...props} />} />
          <Route path="/contactus" component={props => 
                <ContactUs {...props} setValue={setValue} setSelectedItem={setSelectedItem}/>} />
          <Route path="/estimate" component={props => <Estimate {...props} />} />
        </Switch>
        <Footer
         value={value} 
         setValue={setValue}
         selectedItem={selectedItem} 
         setSelectedItem={setSelectedItem}
        />
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
