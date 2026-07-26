    function PerkCard({ icon: Icon, title, copy }) {
    return (
        <div className="perk-card">
        <div className="perk-icon">
            <Icon size={20} />
        </div>
        <h4>{title}</h4>
        <p>{copy}</p>
        </div>
    );
    }

    export default PerkCard;