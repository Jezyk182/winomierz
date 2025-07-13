import { useState } from "react";

const Glowna = () => {
  const [wynik, setWynik] = useState({
    ilosc: 0,
    isFinite: true,
    isPositive: true,
  });

  const [data, setData] = useState({
    obj: 0,
    aktObj: 0,
    docObj: 0,
    dolObj: 0,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCalc = () => {
    let odp = (data.obj * (data.docObj - data.aktObj)) / (data.dolObj - data.docObj)
    odp = Math.round(odp * 100) / 100
    setWynik({
        ilosc: odp,
        isFinite: isFinite(wynik.ilosc),
        isPositive: odp > 0
    })
  }

  return (
    <div className="m-auto w-fit">
      <h1 className="text-center text-2xl font-bold mt-2">
        Kalkulator Stężenia Alkoholu
      </h1>
      <div className="flex flex-col justify-center m-auto gap-4 mt-12">
        <label htmlFor="" className="flex items-center gap-3">
          Objętość napoju (w litrach):
          <input
            type="number"
            name="obj"
            placeholder="Podaj numer"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            onChange={handleChange}
            value={data.obj}
          />
        </label>
        <label htmlFor="" className="flex items-center gap-3">
          Aktualne stężenie:
          <input
            type="number"
            name="aktObj"
            placeholder="Podaj numer"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            onChange={handleChange}
            value={data.aktObj}
          />
          %
        </label>
        <label htmlFor="" className="flex items-center gap-3">
          Docelowe stężenie:
          <input
            type="number"
            name="docObj"
            placeholder="Podaj numer"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            onChange={handleChange}
            value={data.docObj}
          />
          %
        </label>
        <label htmlFor="" className="flex items-center gap-3">
          
          Stężenie dolewanego alkoholu:
          <input
            type="number"
            name="dolObj"
            placeholder="Podaj numer"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            onChange={handleChange}
            value={data.dolObj}
          />
          %
        </label>

        <input
          type="button"
          value="Oblicz"
          onClick={handleCalc}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
        />
        <p className="mt-2">
            {wynik.isFinite && wynik.isPositive && `Należy wlać ${wynik.ilosc} litry alkoholu.`}
            {!wynik.isPositive && `Należy wlać ${wynik.ilosc} wody.`}            
        </p>
      </div>
    </div>
  );
};

export default Glowna;
