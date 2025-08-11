"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  min?: number;
  max?: number;
};

export function QuantitySelector({ quantity, setQuantity, min = 1, max = 999 }: QuantitySelectorProps) {
  const handleDecrement = () => {
    setQuantity(Math.max(min, quantity - 1));
  };

  const handleIncrement = () => {
    setQuantity(Math.min(max, quantity + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      value = min;
    }
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    setQuantity(value);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-r-none"
        onClick={handleDecrement}
        disabled={quantity <= min}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <Input
        type="number"
        className="h-8 w-14 rounded-none border-l-0 border-r-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-l-none"
        onClick={handleIncrement}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
