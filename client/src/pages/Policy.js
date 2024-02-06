import Layout from '../components/Layout/Layout'
import React, { useState } from 'react';


const Policy = () => {
  const [activeTab, setActiveTab] = useState('tab_item_1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
        <div className="wrapper flex_align_justify">
      <div className="tc_wrap">
        <div className="tabs_list">
          <ul>
            <li
              onClick={() => handleTabClick('tab_item_1')}
              className={activeTab === 'tab_item_1' ? 'active' : ''}
              data-tc="tab_item_1"
            >
              Terms of use
            </li>
            <li
              onClick={() => handleTabClick('tab_item_2')}
              className={activeTab === 'tab_item_2' ? 'active' : ''}
              data-tc="tab_item_2"
            >
              Intellectual property rights
            </li>
            <li
              onClick={() => handleTabClick('tab_item_3')}
              className={activeTab === 'tab_item_3' ? 'active' : ''}
              data-tc="tab_item_3"
            >
              Prohibited activities
            </li>
            <li
              onClick={() => handleTabClick('tab_item_4')}
              className={activeTab === 'tab_item_4' ? 'active' : ''}
              data-tc="tab_item_4"
            >
              Termination clause
            </li>
            <li
              onClick={() => handleTabClick('tab_item_5')}
              className={activeTab === 'tab_item_5' ? 'active' : ''}
              data-tc="tab_item_5"
            >
              Governing law
            </li>
          </ul>
        </div>
        <div className="tabs_content">
          <div className="tab_head">
            <h2>Terms & Conditions</h2>
          </div>
          <div className="tab_body">
            <div className={`tab_item tab_item_1 ${activeTab === 'tab_item_1' ? 'active' : ''}`}>
            <p>Welcome to NITJ Auto-Booking Website. By accessing or using our website, you agree to be
                            bound by these
                            terms of use. Our website provides a platform for users to book auto services, subject to
                            additional terms and conditions set by service providers. You are responsible for
                            maintaining the confidentiality of your account information and agree to pay all associated
                            fees. </p>
                        <p>Any content you submit to the website grants us a license to use it. All content on the
                            website is protected by intellectual property laws. We are not liable for any indirect or
                            consequential damages arising from your use of the website. We reserve the right to update
                            these terms at any time, and your continued use of the website constitutes acceptance of the
                            changes. These terms are governed by the laws of [Jurisdiction]. If you have any questions,
                            please contact us at [Contact Information].</p>
                        <p>Our user-friendly platform allows you to browse a wide range of vehicles, compare prices, and
                            book your desired service with just a few clicks. With a network of trusted partners and a
                            commitment to customer satisfaction, NITJ Auto-Booking Website is your trusted companion for
                            all your
                            automotive needs. Start your journey with us today and experience the ease and efficiency of
                            online auto booking.</p>
            </div>
            <div className={`tab_item tab_item_2 ${activeTab === 'tab_item_2' ? 'active' : ''}`}>
            <p>All content available on NITJ Auto-Booking Website, including but not limited to text,
                            graphics, logos,
                            button icons, images, audio clips, digital downloads, data compilations, and software, is
                            the property of NITJ Auto-Booking Website or its content suppliers and is protected by
                            international
                            copyright laws. The compilation of all content on this site is the exclusive property of
                            NITJ Auto-Booking Website and protected by international copyright laws.</p>
                        <p>Ownership of Content: All content, including but not limited to text, graphics, logos,
                            images, audio clips, digital downloads, data compilations, and software used on this
                            website, is the property of website or its content suppliers and protected by
                            international copyright laws. The compilation of all content on this site is the exclusive
                            property of website, with copyright authorship for this collection by [Your
                            Company Name].</p>
                        <p>Trademarks: , its logo, and all other trademarks, service marks, graphics,
                            and logos used in connection with website, or this website are trademarks or
                            registered trademarks of [Your Company Name]. Other trademarks, service marks, graphics, and
                            logos used in connection with our website may be the trademarks of other third parties. Your
                            use of our website grants you no right or license to reproduce or otherwise use any
                            or third-party trademarks.</p>
                        <p>License and Site Access: website grants you a limited license to access and make
                            personal use of this website, but not to download or modify it, or any portion of it, except
                            with express written consent of website. This license does not include any
                            resale or commercial use of this website or its contents; any collection and use of any
                            product listings, descriptions, or prices; any derivative use of this website or its
                            contents; any downloading or copying of account information for the benefit of another
                            merchant; or any use of data mining, robots, or similar data gathering and extraction tools.
                            This website or any portion of this website may not be reproduced, duplicated, copied, sold,
                            resold, visited, or otherwise exploited for any commercial purpose without express written
                            consent of website</p>

                        <p> Unauthorized use of the materials appearing on this site may violate copyright, trademark,
                            and other applicable laws and could result in criminal or civil penalties.</p>            </div>
            <div className={`tab_item tab_item_3 ${activeTab === 'tab_item_3' ? 'active' : ''}`}>
            <p>While we strive to provide a seamless and convenient experience on NITJ Auto-Booking Website,
                            certain activities are strictly prohibited to ensure the safety and integrity of our
                            platform. You
                            agree not to engage in any unlawful, abusive, or fraudulent activities while using our
                            website. This includes but is not limited to: </p>

                        <p> Using the website for any illegal purpose or in violation of any applicable laws or
                            regulations.affiliation with a person or entity.</p>

                        <p>Impersonating any person or entity or falsely stating or otherwise misrepresenting your
                            affiliation with a person or entity.</p>
                        <p>
                            Attempting to gain unauthorized access to any portion or feature of the website or any other
                            systems or networks connected to the website.</p>
                        <p>
                            Uploading or transmitting viruses, worms, or any other malicious code that could harm our
                            website or interfere with the operation of our services.</p>
                        <p>
                            Engaging in any activity that disrupts or interferes with the proper functioning of our
                            website or any transactions conducted on the website.</p>
                        <p>
                            Harassing, threatening, or intimidating other users of the website or any employees or
                            representatives of NITJ Auto-Booking Website.
                        </p>
                        <p> Any violation of these prohibited activities may result in the termination of your access to
                            our website and may also be subject to legal action. We reserve the right to investigate and
                            take appropriate legal action against anyone who, in our sole discretion, violates this
                            section, including removing any offending content, suspending or terminating access to the
                            website, and reporting such activities to law enforcement authorities.

                        </p>            </div>
            <div className={`tab_item tab_item_4 ${activeTab === 'tab_item_4' ? 'active' : ''}`}>
            <p>We reserve the right to terminate or suspend your access to all or any part of NITJ
                            Auto-Booking Websiteat any time, with or without cause, with or without notice, effective
                            immediately. If you
                            wish to terminate your account, you may simply discontinue using the website. All provisions
                            of these Terms of Use which by their nature should survive termination shall survive
                            termination, including, without limitation, ownership provisions, warranty disclaimers,
                            indemnity, and limitations of liability.

                        <p>This clause outlines the website's right to terminate or suspend user access with or without
                            cause and with or without notice, while also specifying that certain provisions of the terms
                            of use will continue to apply even after termination.</p>
                        </p>            </div>
            <div className={`tab_item tab_item_5 ${activeTab === 'tab_item_5' ? 'active' : ''}`}>
            <p>These Terms of Use shall be governed by and construed in accordance with the laws of
                            [Jurisdiction], without regard to its conflict of law provisions. Any legal action or
                            proceeding arising out of or related to these Terms of Use or the use of [Website Name]
                            shall be brought exclusively in the courts of [Jurisdiction], and you hereby consent to the
                            jurisdiction and venue of such courts and waive any objection to such jurisdiction or venue.
                        </p>
                        <p>This clause specifies that the terms of use are governed by the laws of a specific
                            jurisdiction and outlines the exclusive jurisdiction and venue for legal actions or
                            proceedings related to the terms of use or the use of the website.</p>
            </div>
          </div>
          <div className="tab_foot flex_align_justify">
            <button className="decline">Decline</button>
            <button className="agree">Agree</button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
    
  );
};

export default Policy;
