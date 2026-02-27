import Admonition from '@theme/Admonition';
import styles from './styles.module.css';

const pricingUrl = "https://ecodata.khoviet.com/pricing";

/**
 * A repurposed admonition to show data plans that support the feature
 * @param {array(string)} plans - (optional) Plans where feature is available
 * @returns 
 */
const Available = ({plans}) => {
    return (
        <Admonition type="note" icon="📊" title="Available On">
            <span className={styles.ecodata}>
                Plans: 
            </span>
            { plans !== undefined ? (
                plans.map((plan, idx) => (
                    <span key={idx} className={styles.plans}>
                        <a href={pricingUrl} target="_blank" rel="noopener noreferrer">{plan}</a>
                    </span>
                ))) 
                : (
                    <span className={styles.plans}>
                        <a href={pricingUrl} target="_blank" rel="noopener noreferrer">All Plans</a>
                    </span>
                )
            }
        </Admonition>
    );
};

export default Available;
