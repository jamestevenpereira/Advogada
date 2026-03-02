import { Component, signal, computed, output, input, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';

/**
 * Custom Calendar Component for Angular v21.
 * Features:
 * - Signals-based state management.
 * - Disables weekends visually.
 * - Modern Tailwind CSS styling.
 * - Mobile-friendly interaction.
 */
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="calendar-container mt-2 bg-white border border-zinc-200 rounded-2xl shadow-sm p-4 w-full">
      <!-- Calendar Header -->
      <div class="flex items-center justify-between mb-4 px-2">
        <h3 class="font-bold text-primary">
          {{ months[viewDate().getMonth()] }} {{ viewDate().getFullYear() }}
        </h3>
        <div class="flex gap-1">
          <button (click)="prevMonth()" type="button" class="nav-btn">
            <lucide-icon [name]="ChevronLeftIcon" class="w-4 h-4" />
          </button>
          <button (click)="nextMonth()" type="button" class="nav-btn">
            <lucide-icon [name]="ChevronRightIcon" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Days Table -->
      <div class="grid grid-cols-7 gap-1 text-center mb-2">
        @for (day of weekDays; track day) {
          <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{{ day }}</span>
        }
      </div>

      <div class="grid grid-cols-7 gap-1">
        <!-- Empty slots for previous month -->
         @for (blank of blanks(); track $index) {
          <div class="h-10"></div>
        }

        <!-- Day slots -->
        @for (day of daysInMonth(); track day.date.getTime()) {
          <button 
            type="button"
            (click)="selectDay(day.date)"
            [disabled]="day.disabled"
            [class.selected-day]="isSelected(day.date)"
            [class.today]="isToday(day.date)"
            [class.weekend]="day.isWeekend"
            class="day-slot group relative h-10 w-full flex items-center justify-center text-sm font-medium rounded-xl transition-all"
            [class.opacity-30]="day.disabled"
            [class.cursor-not-allowed]="day.disabled"
          >
            {{ day.date.getDate() }}
            @if (isToday(day.date)) {
              <span class="absolute bottom-1.5 w-1 h-1 bg-secondary rounded-full"></span>
            }
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .nav-btn {
      @apply p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 transition-colors;
    }
    .day-slot {
      @apply hover:bg-secondary/10 hover:text-secondary text-primary;
    }
    .selected-day {
      @apply bg-primary text-white hover:bg-primary hover:text-white shadow-md;
    }
    .today {
      @apply font-bold text-secondary;
    }
    .weekend {
      @apply text-zinc-300;
    }
  `]
})
export class CalendarComponent {
  // --------------------------------------------------------------------------
  // Inputs & Outputs
  // --------------------------------------------------------------------------
  selectedDate = input<string | null>(null);
  dateChange = output<string>();

  // --------------------------------------------------------------------------
  // State Signals
  // --------------------------------------------------------------------------
  viewDate = signal(new Date());
  months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  ChevronLeftIcon = ChevronLeft;
  ChevronRightIcon = ChevronRight;

  private platformId = inject(PLATFORM_ID);

  // --------------------------------------------------------------------------
  // Computed Signals
  // --------------------------------------------------------------------------

  /** Generates array of days for the current view month */
  daysInMonth = computed(() => {
    const date = this.viewDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const days: any[] = [];

    const lastDay = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= lastDay; i++) {
      const d = new Date(year, month, i);
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isPast = d < today;

      days.push({
        date: d,
        isWeekend,
        disabled: isWeekend || isPast,
      });
    }
    return days;
  });

  /** Calculates blank slots at the start of the month */
  blanks = computed(() => {
    const date = this.viewDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return Array(firstDay).fill(null);
  });

  // --------------------------------------------------------------------------
  // Methods
  // --------------------------------------------------------------------------

  prevMonth() {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth() {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDay(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const isoString = `${year}-${month}-${day}`;
    this.dateChange.emit(isoString);
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate()) return false;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const isoString = `${year}-${month}-${day}`;
    return isoString === this.selectedDate();
  }

  isToday(date: Date): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }
}
