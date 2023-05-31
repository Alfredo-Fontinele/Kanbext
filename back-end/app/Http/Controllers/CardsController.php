<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;

class CardsController extends Controller
{
    public function findAll()
    {
        $cards = Card::all();
        return response()->json($cards);
    }

    public function create(Request $request)
    {
        try {
            $validated = $request->validate([
                'titulo' => 'required',
                'conteudo' => 'required',
                'lista' => 'required'
            ]);
            $alreadyExistTitle = $this->verifyCardAlreadyExist($validated['titulo']);
            if ($alreadyExistTitle) {
                return response()->json(['message' => 'already exist card title'], 400);
            }
            $newCard = Card::create([
                'titulo' => $validated['titulo'],
                'conteudo' => $validated['conteudo'],
                'lista' => $validated['lista']
            ]);
            return response()->json($newCard);
        } catch(\Exception $exc) {
            return response()->json(['error'=> $exc->getMessage()]);
        }
    }

    public function findOne($card_id)
    {
        $cardFound = Card::findOrFail($card_id);
        return response()->json($cardFound);
    }

    public function update(Request $request, $card_id)
    {
        $cardFound = Card::findOrFail($card_id);
        $cardFound->fill($request->only(['titulo', 'conteudo', 'lista']));
        $cardFound->save();
        return response()->json([$cardFound]);
    }

    public function delete($card_id)
    {
        $cardFound = Card::findOrFail($card_id);
        $cardFound->delete();
        return response()->json([''], 204);
    }

    public function verifyCardAlreadyExist($titulo)
    {
        return Card::where('titulo', $titulo)->exists();
    }
}
