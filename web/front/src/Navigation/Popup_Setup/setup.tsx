import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./setup.scss";
import { useOrgaSkip } from "../../context/orgaSkip";

interface PeriodType {
  start: string;
  end: string;
}

interface SetupProps {
  period: PeriodType;
  setPeriod: (period: PeriodType) => void;
  setPopup: (show: boolean) => void;
}

export default function Setup({period , setPeriod, setPopup}: SetupProps) {

  const [tableName, setTableName] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const orgaSkip = useOrgaSkip((state) => state.orgaSkip);
  const setOrgaSkip = useOrgaSkip((state) => state.setOrgaSkip);
  const clearOrgaSkip = useOrgaSkip((state) => state.clearOrgaSkip);
  const addOrgaSkip = useOrgaSkip((state) => state.addOrgaSkip);
  const deleteOrgaSkip = useOrgaSkip((state) => state.deleteOrgaSkip);
  const hasOrgaSkip = useOrgaSkip((state) => state.hasOrgaSkip);

  const handlereset = () => {
      setPeriod({start: "2012-01-02", end: "2025-02-01"})
      sessionStorage.setItem('start', "2012-01-02")
      sessionStorage.setItem('end', "2025-02-01")
  }

  const date_submit =  (e) => {
    e.preventDefault();
    const start = e.target.start.value || period.start
    const end = e.target.end.value || period.end
    console.log(start + " " + end)
    if (start && end && start > end){
      alert("start need to be less than end")
      return
    }
    setPeriod({start: start, end:end})
    sessionStorage.setItem('start', start)
    sessionStorage.setItem('end', end)
  }

  async function get_name_org() {
		try {
			const url = `/api/Db/OrgaName`
			const rep = await fetch(url, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})
			const ret = await rep.json();
			if (ret.success){
        setTableName(ret.data)
			}
			return;
		} catch (err) {
			console.log("errror " + err)
		}
	}

	useEffect(() => {
    get_name_org()
	}, [])

const handleSelectOrga = (selectedValue: string) => {
    const exists = tableName.includes(selectedValue);
    if (hasOrgaSkip(selectedValue)) return false;
    if (exists) {
      addOrgaSkip(selectedValue); 
      setInputValue(''); 
      console.log(`🏢 ${selectedValue} a été ajouté au filtre !`);
      console.log(`Ma data ${orgaSkip}`)
    }
  };

const filteredSuggestions = inputValue.length >= 3 
  ? tableName.filter(name => {
      if (!name) return false;
      return String(name).toLowerCase().includes(inputValue.toLowerCase());
    })
  : [];
  
  return (
          <div className="setup_box">
            <button type="button" onClick={() =>(setPopup(false))}>X</button>
            <form onSubmit={date_submit} className="date_form">
              <strong className="text">Date de début</strong>
              <input type="date"  name="start" max={period.end ||"2025-02-01" } min="2012-01-02" defaultValue={period.start}  placeholder={`start`}/>
              <strong className="text">Date de fin</strong>
              <input type="date"  name="end"  max="2025-02-01" min={period.start|| "2012-01-02" } defaultValue={period.end} placeholder={`end`}/>
              <div className="button" >
                <button type="submit" >valider</button>
                <button type="button" onClick={handlereset}>reset</button>
              </div>
            </form>  
              <div  className="list_name">
                <strong className="titre">Organisation a ignorer</strong>
                <input id="orga-input" type="text"  value={inputValue}
                        placeholder="Tapez au moins 3 lettres..."
                        list="orga-options"
                        className="orga-search-input"
                        autoComplete="off"
                        onChange={(e) => {
                          const val = e.target.value;
                          setInputValue(val);
                          handleSelectOrga(val); 
                        }}
                      />
                <datalist id="orga-options">
                        {filteredSuggestions.map((name, index) => (
                          <option key={index} value={name} />
                        ))}
                </datalist>
                {inputValue.length > 0 && inputValue.length < 3 && (
                  <div className="notif waiting">
                    Entrez encore {3 - inputValue.length} caractère(s)...
                  </div>
                )}
                {tableName.includes(inputValue) && (
                  <div className="notif good">
                    ✓ Organisation sélectionnée avec succès
                  </div>
                )}
                {orgaSkip.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                    <strong style={{ fontSize: '13px', color: '#ffffff' }}>Organisation Filtré :</strong>
                    {orgaSkip.map((r, index) => (
                      <span key={index} className="delete">
                        • {r}
                      </span>
                    ))}
                  </div>
                )}
            <button 
              type="button" 
              onClick={() => {
                clearOrgaSkip();
                console.log("Le filtre Zustand a été vidé !");
              }}
              style={{ marginTop: '8px', background: '#374151', color: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', border: 'none', fontSize: '11px', cursor: 'pointer' }}
              >
              🗑️ Vider la liste noire actuelle ({orgaSkip.length})
            </button>
              </div>
            </div>
  )
}