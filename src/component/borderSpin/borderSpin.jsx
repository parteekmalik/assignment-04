import "./borderSpin.css";

function BorderSpin({ children }) {
    return (
        <div className="rotatingBoarder">
            <div className="z-10 relative border rounded-lg bg-mainButton innerDiv">{children}</div>
        </div>
    );
}

export default BorderSpin;
