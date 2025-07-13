import { useState } from "react";

const Glowna = () => {
  const [wynik, setWynik] = useState({
    ilosc: 0,
    isFinite: true,
    isPositive: true,
    isValid: true,
  });

  const [data, setData] = useState({
    obj: 0,
    aktObj: 0,
    docObj: 0,
    dolObj: 0,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const getJednostka = (n) => {
    const ilosc = Math.floor(n);
    const ostatniaCyfra = ilosc % 10;
    const ostatnieDwie = ilosc % 100;

    if (ostatniaCyfra === 1 && ostatnieDwie !== 11) return "litr";
    if ([2, 3, 4].includes(ostatniaCyfra) && ![12, 13, 14].includes(ostatnieDwie)) return "litry";
    return "litrów";
  };

  const handleCalc = () => {
    const { obj, aktObj, docObj, dolObj } = data;

    if (
      isNaN(obj) || isNaN(aktObj) || isNaN(docObj) || isNaN(dolObj) ||
      dolObj === docObj
    ) {
      setWynik({
        ilosc: 0,
        isFinite: false,
        isPositive: true,
        isValid: false,
      });
      return;
    }

    let odp = (obj * (docObj - aktObj)) / (dolObj - docObj);
    odp = Math.round(odp * 100) / 100;

    setWynik({
      ilosc: odp,
      isFinite: isFinite(odp),
      isPositive: odp > 0,
      isValid: true,
    });
  };

  return (
    <div className="m-auto w-fit">
      <h1 className="text-center text-2xl font-bold mt-2">
        Kalkulator Stężenia Alkoholu
      </h1>
      <div className="flex flex-col justify-center m-auto gap-4 mt-12">
        <label className="flex items-center gap-3">
          Objętość napoju (w litrach):
          <input
            type="number"
            name="obj"
            placeholder="Podaj liczbę"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            onChange={handleChange}
            value={data.obj}
          />
        </label>
        <label className="flex items-center gap-3">
          Aktualne stężenie:
          <input
            type="number"
            name="aktObj"
            placeholder="Podaj liczbę"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            onChange={handleChange}
            value={data.aktObj}
          />
          %
        </label>
        <label className="flex items-center gap-3">
          Docelowe stężenie:
          <input
            type="number"
            name="docObj"
            placeholder="Podaj liczbę"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            onChange={handleChange}
            value={data.docObj}
          />
          %
        </label>
        <label className="flex items-center gap-3">
          Stężenie dolewanego alkoholu:
          <input
            type="number"
            name="dolObj"
            placeholder="Podaj liczbę"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            onChange={handleChange}
            value={data.dolObj}
          />
          %
        </label>

        <input
          type="button"
          value="Oblicz"
          onClick={handleCalc}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
        />

        <p className="mt-2 font-semibold text-lg text-center">
          {!wynik.isValid && (
            <span className="text-red-600">
              Błąd: nieprawidłowe dane lub dzielenie przez zero.
            </span>
          )}
          {wynik.isValid && wynik.isFinite && wynik.isPositive && (
            <>
              Aby <span className="font-bold">zwiększyć</span> stężenie, należy dolać{" "}
              <span className="font-bold">
                {wynik.ilosc} {getJednostka(wynik.ilosc)}
              </span>{" "}
              alkoholu.
            </>
          )}
          {wynik.isValid && wynik.isFinite && !wynik.isPositive && (
            <>
              Aby <span className="font-bold">zmniejszyć</span> stężenie, należy dolać{" "}
              <span className="font-bold">
                {Math.abs(wynik.ilosc)} {getJednostka(Math.abs(wynik.ilosc))}
              </span>{" "}
              wody.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Glowna;
